"use client";

import isNil from "lodash/isNil";
import {type FC, memo, useActionState, useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {checkLikeAction} from "@/app/actions/like/checkLike/checkLikeAction";
import type {TLike} from "@/app/api/like/types";
import {ECheckLikeFormFields} from "@/app/actions/like/checkLike/enum";
import {INITIAL_FORM_STATE} from "@/app/shared/constants/form";
import {ELanguage} from "@/app/shared/enums";
import {useDayjs} from "@/app/uikit/components/dateTime/hooks";
import {notification} from "@/app/uikit/utils";
import "./CheckLike.scss";

type TProps = {
  csrf: string;
  initDataCrypt?: string;
  isSession: boolean;
  lng: ELanguage;
  telegramUserId: string;
}

const CheckLikeComponent: FC<TProps> = ({csrf, initDataCrypt, isSession, lng, telegramUserId}) => {
  const [state, formAction] = useActionState(checkLikeAction, INITIAL_FORM_STATE);
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const [lastLike, setLastLike] = useState<TLike | null>(null);
  const [isNewLike, setIsNewLike] = useState(false);
  const DURATION = 10000;
  const { dayjs } = useDayjs();
  const { t } = useTranslation("index");

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const newLike = state.data;
      const now = dayjs().utc();
      const likeCreatedAt = dayjs(newLike.createdAt).utc();
      const differenceTime = now.diff(likeCreatedAt, "second");

      setLastLike((prev) => {
        if (newLike.createdAt !== prev?.createdAt && differenceTime < 20) {
          setIsNewLike(true);
        }
        return newLike;
      });
      setIsNewLike(false);
    }
  }, [lng, state, telegramUserId]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      // @ts-ignore
      if ("click" in buttonSubmitRef.current) {
        buttonSubmitRef.current && buttonSubmitRef.current.click();
      }
    }, DURATION);
    return () => clearInterval(intervalId);
  }, [telegramUserId]);

  useEffect(() => {
    if (isNewLike) {
      notification({
        title: t("common.titles.isNewLike"),
        type: "success",
      });
    }
  }, [isNewLike]);

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(ECheckLikeFormFields.TelegramUserId, telegramUserId);
      formDataDto.append(ECheckLikeFormFields.TelegramInitDataCrypt, initDataCrypt ?? "");
      formDataDto.append(ECheckLikeFormFields.Csrf, csrf);
      // @ts-ignore
      formAction(formDataDto);
    }
  }

  return (
    <form action={handleSubmit} className="CheckLike-Form">
      <input hidden={true} ref={buttonSubmitRef} type="submit"/>
    </form>
  )
}

CheckLikeComponent.displayName = "CheckLike";

export const CheckLike = memo(CheckLikeComponent);