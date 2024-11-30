"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { addBlockAction } from "@/app/actions/block/add/addBlockAction";
import { useTranslation } from "@/app/i18n/client";
import { EBlockFormFields } from "@/app/actions/block/add/enums";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import {
  useAuthenticityTokenContext,
  useTelegramContext,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { Typography } from "@/app/uikit/components/typography";

type TProps = {
  blockedUserSessionId: string;
  lng: ELanguage;
  onCloseDropDown?: () => void;
};

export const Block: FC<TProps> = ({ blockedUserSessionId, lng, onCloseDropDown }) => {
  const csrf = useAuthenticityTokenContext();
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const { t } = useTranslation("index");
  const [state, formAction] = useFormState(addBlockAction, INITIAL_FORM_STATE);
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.Root,
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, state?.data, state?.error, state.success]);

  const handleBlock = () => {
    // @ts-ignore
    if ("click" in buttonSubmitRef.current) {
      buttonSubmitRef.current && buttonSubmitRef.current.click();
    }
    onCloseDropDown?.();
  };

  const handleSubmit = (formData: FormData) => {
    if (isSession && blockedUserSessionId) {
      const formDataDto = new FormData();
      formDataDto.append(
        EBlockFormFields.SessionId,
        (telegram?.user?.id ?? "").toString(),
      );
      formDataDto.append(
        EBlockFormFields.BlockedUserSessionId,
        blockedUserSessionId.toString(),
      );
      formDataDto.append(
        EBlockFormFields.TelegramInitDataCrypt,
        telegram?.initDataCrypt ?? "",
      );
      formDataDto.append(EBlockFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <>
      <div
        className="DropDown-MenuItem DropDown-MenuItem-Warning"
        onClick={handleBlock}
      >
        <Typography>{t("common.actions.block")}</Typography>
      </div>
      <form action={handleSubmit} className="Block-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </>
  );
};
