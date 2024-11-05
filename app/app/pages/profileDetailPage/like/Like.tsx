import isNil from "lodash/isNil";
import { type FC, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addLikeAction } from "@/app/actions/like/add/addLikeAction";
import { EAddLikeFormFields } from "@/app/actions/like/add/enum";
import { EUpdateLikeFormFields } from "@/app/actions/like/update/enum";
import { updateLikeAction } from "@/app/actions/like/update/updateLikeAction";
import type { TProfileDetail } from "@/app/api/profile/detail";
import { useTranslation } from "@/app/i18n/client";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useTelegramContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { DATE_FORMAT } from "@/app/uikit/components/dateTime/constants";
import { useDayjs } from "@/app/uikit/components/dateTime/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./Like.scss";

type TProps = {
  lng: ELanguage;
  profile?: TProfileDetail;
  sessionId: string;
};

export const Like: FC<TProps> = ({ lng, profile, sessionId }) => {
  const telegram = useTelegramContext();
  const isLiked = profile?.like?.isLiked;
  const { dayjs } = useDayjs();
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const { t } = useTranslation("index");
  const [isShowTooltipHeart, setIsShowTooltipHeart] = useState(false);

  const message = isShowTooltipHeart
    ? t("pages.profile.doubleLike")
    : undefined;

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

  const [_, formAction] = useFormState(
    // @ts-ignore
    canAddLike ? addLikeAction : updateLikeAction,
    INITIAL_FORM_STATE,
  );

  const handleHeartClick = () => {
    if (isCanClickHeart) {
      // @ts-ignore
      if ("click" in buttonSubmitRef.current) {
        buttonSubmitRef.current && buttonSubmitRef.current.click();
      }
      return;
    }
    setIsShowTooltipHeart(true);
  };

  const handleSubmit = () => {
    if (profile) {
      const formDataDto = new FormData();
      if (canAddLike) {
        formDataDto.append(EAddLikeFormFields.Language, lng);
        formDataDto.append(
          EAddLikeFormFields.LikedSessionId,
          profile.sessionId,
        );
        formDataDto.append(EAddLikeFormFields.SessionId, sessionId);
        formDataDto.append(
          EAddLikeFormFields.TelegramInitDataCrypt,
          telegram?.initDataCrypt ?? "",
        );
      }
      if (canCancelLike) {
        formDataDto.append(
          EUpdateLikeFormFields.Id,
          (profile.like?.id ?? "").toString(),
        );
        formDataDto.append(EUpdateLikeFormFields.IsLiked, "false");
        formDataDto.append(EUpdateLikeFormFields.Language, lng);
        formDataDto.append(
          EUpdateLikeFormFields.LikedSessionId,
          profile.sessionId,
        );
        formDataDto.append(EUpdateLikeFormFields.SessionId, sessionId);
        formDataDto.append(
          EUpdateLikeFormFields.TelegramInitDataCrypt,
          telegram?.initDataCrypt ?? "",
        );
      }
      if (canUpdateLike) {
        formDataDto.append(
          EUpdateLikeFormFields.Id,
          (profile.like?.id ?? "").toString(),
        );
        formDataDto.append(EUpdateLikeFormFields.IsLiked, "true");
        formDataDto.append(EUpdateLikeFormFields.Language, lng);
        formDataDto.append(
          EUpdateLikeFormFields.LikedSessionId,
          profile.sessionId,
        );
        formDataDto.append(EUpdateLikeFormFields.SessionId, sessionId);
        formDataDto.append(
          EUpdateLikeFormFields.TelegramInitDataCrypt,
          telegram?.initDataCrypt ?? "",
        );
      }
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <div className="Like" onClick={handleHeartClick}>
      {isLiked ? (
        <div className="Like-Info">
          {message && (
            <div className="Like-Message">
              <Typography>{message}</Typography>
            </div>
          )}
          <div>
            <Icon className="Like-Icon" type="Heart" />
          </div>
        </div>
      ) : (
        <div className="Like-Info">
          {message && (
            <div className="Like-Message">
              <Typography>{message}</Typography>
            </div>
          )}
          <div>
            <Icon className="Like-Icon" type="HeartEmpty" />
          </div>
        </div>
      )}
      <form action={handleSubmit} className="Like-Form">
        <input hidden={true} ref={buttonSubmitRef} type="submit" />
      </form>
    </div>
  );
};
