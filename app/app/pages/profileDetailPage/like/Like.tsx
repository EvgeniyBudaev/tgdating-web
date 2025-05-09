"use client";

import isNil from "lodash/isNil";
import {
  type FC,
  memo,
  useActionState,
  useMemo,
  useRef,
  useState,
} from "react";
import { addLikeAction } from "@/app/actions/like/addLike/addLikeAction";
import { EAddLikeFormFields } from "@/app/actions/like/addLike/enum";
import { EUpdateLikeFormFields } from "@/app/actions/like/updateLike/enum";
import { updateLikeAction } from "@/app/actions/like/updateLike/updateLikeAction";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { LikeButton } from "@/app/pages/profileDetailPage/like/likeButton";
import { INITIAL_FORM_STATE } from "@/app/shared/constants";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { DATE_FORMAT } from "@/app/uikit/components/dateTime/constants";
import { useDayjs } from "@/app/uikit/components/dateTime/hooks";
import "./Like.scss";

type TProps = {
  lng: ELanguage;
  profile?: TProfileDetail;
  telegramUserId: string;
};

const LikeComponent: FC<TProps> = ({ lng, profile, telegramUserId }) => {
  const csrf = useAuthenticityTokenContext();
  const { initDataCrypt, theme } = useTelegram();
  const isLiked = profile?.like?.isLiked;
  const { dayjs } = useDayjs();
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const [isShowTooltipHeart, setIsShowTooltipHeart] = useState(false);

  const canAddLike = useMemo(() => {
    return isNil(profile?.like?.id);
  }, [profile?.like?.id]);

  const canUpdateLike = useMemo(() => {
    return !isNil(profile?.like?.id) && !profile?.like?.isLiked;
  }, [profile?.like?.id, profile?.like?.isLiked]);

  const canCancelLike = useMemo(() => {
    return !isNil(profile?.like?.id) && profile?.like?.isLiked;
  }, [profile?.like?.id, profile?.like?.isLiked]);

  const isCanClickHeart = useMemo(() => {
    if (isNil(profile?.like?.updatedAt)) {
      return true;
    }

    const lastClickDate = dayjs(profile?.like?.updatedAt)
      .utc()
      .format(DATE_FORMAT);
    const today = dayjs().utc().format(DATE_FORMAT);
    return canCancelLike || lastClickDate !== today;
  }, [canCancelLike, dayjs, profile?.like?.updatedAt]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, formAction] = useActionState(
    // @ts-ignore
    canAddLike ? addLikeAction : updateLikeAction,
    INITIAL_FORM_STATE,
  );

  const handleHeartClick = () => {
    if (isCanClickHeart) {
      if (buttonSubmitRef?.current && "click" in buttonSubmitRef.current) {
        buttonSubmitRef.current.click();
      }
      return;
    }
    setIsShowTooltipHeart(true);
  };

  const handleCloseTooltip = () => {
    setIsShowTooltipHeart(false);
  };

  const handleSubmit = () => {
    if (profile) {
      const formDataDto = new FormData();
      if (canAddLike) {
        formDataDto.append(EAddLikeFormFields.Language, lng);
        formDataDto.append(
          EAddLikeFormFields.LikedTelegramUserId,
          profile.telegramUserId,
        );
        formDataDto.append(EAddLikeFormFields.TelegramUserId, telegramUserId);
        formDataDto.append(
          EAddLikeFormFields.TelegramInitDataCrypt,
          initDataCrypt ?? "",
        );
        formDataDto.append(EAddLikeFormFields.Csrf, csrf ?? "");
      }
      if (canCancelLike) {
        formDataDto.append(
          EUpdateLikeFormFields.Id,
          (profile.like?.id ?? "").toString(),
        );
        formDataDto.append(EUpdateLikeFormFields.IsLiked, "false");
        formDataDto.append(EUpdateLikeFormFields.Language, lng);
        formDataDto.append(
          EUpdateLikeFormFields.LikedTelegramUserId,
          profile.telegramUserId,
        );
        formDataDto.append(
          EUpdateLikeFormFields.TelegramUserId,
          telegramUserId,
        );
        formDataDto.append(
          EUpdateLikeFormFields.TelegramInitDataCrypt,
          initDataCrypt ?? "",
        );
        formDataDto.append(EUpdateLikeFormFields.Csrf, csrf ?? "");
      }
      if (canUpdateLike) {
        formDataDto.append(
          EUpdateLikeFormFields.Id,
          (profile.like?.id ?? "").toString(),
        );
        formDataDto.append(EUpdateLikeFormFields.IsLiked, "true");
        formDataDto.append(EUpdateLikeFormFields.Language, lng);
        formDataDto.append(
          EUpdateLikeFormFields.LikedTelegramUserId,
          profile.telegramUserId,
        );
        formDataDto.append(
          EUpdateLikeFormFields.TelegramUserId,
          telegramUserId,
        );
        formDataDto.append(
          EUpdateLikeFormFields.TelegramInitDataCrypt,
          initDataCrypt ?? "",
        );
        formDataDto.append(EUpdateLikeFormFields.Csrf, csrf ?? "");
      }
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <form
      action={handleSubmit}
      className="Like-Form"
      style={{ justifyContent: !isShowTooltipHeart ? "flex-end" : "center" }}
    >
      <LikeButton
        isLiked={isLiked}
        isShowTooltipHeart={isShowTooltipHeart}
        onClick={handleHeartClick}
        onCloseTooltip={handleCloseTooltip}
        theme={theme}
      />
      <input hidden={true} ref={buttonSubmitRef} type="submit" />
    </form>
  );
};

LikeComponent.displayName = "Like";

export const Like = memo(LikeComponent);
