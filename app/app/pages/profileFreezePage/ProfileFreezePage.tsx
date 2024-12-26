"use client";

import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { EProfileRestoreFormFields } from "@/app/actions/profile/restoreProfile/enums";
import { restoreProfileAction } from "@/app/actions/profile/restoreProfile/restoreProfileAction";
import { useTranslation } from "@/app/i18n/client";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import {
  useAuthenticityTokenContext,
  useTelegramContext,
} from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { Typography } from "@/app/uikit/components/typography";
import "./ProfileFreezePage.scss";

type TProps = {
  isDeleted?: boolean;
  lng: ELanguage;
  telegramUserId: string;
};

const ProfileFreezePageComponent: FC<TProps> = ({
  isDeleted,
  lng,
  telegramUserId,
}) => {
  const csrf = useAuthenticityTokenContext();
  const { t } = useTranslation("index");
  const telegram = useTelegramContext();
  const user = telegram?.user;
  const isSession = telegram?.isSession;
  const isSessionUser = Boolean(
    telegramUserId && telegram?.user?.id.toString() === telegramUserId,
  );
  const [state, formAction] = useActionState(
    restoreProfileAction,
    INITIAL_FORM_STATE,
  );

  useEffect(() => {
    if (!isDeleted) {
      const path = createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId: (user?.id ?? "").toString() },
        lng: lng,
      });
      redirect(path);
    }
  }, [isDeleted]);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const path = createPath({
        route: ERoutes.ProfileDetail,
        params: {
          telegramUserId: telegramUserId,
          viewedTelegramUserId: telegramUserId,
        },
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, state?.data, state?.error, state.success]);

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EProfileRestoreFormFields.TelegramUserId,
        telegramUserId,
      );
      formDataDto.append(
        EProfileRestoreFormFields.TelegramInitDataCrypt,
        telegram?.initDataCrypt ?? "",
      );
      formDataDto.append(EProfileRestoreFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  return (
    <div className="ProfileFreezePage">
      <div className="ProfileFreezePage-Inner">
        <div className="ProfileFreezePage-Title">
          {isSessionUser && (
            <Typography>{t("common.titles.accountFrozen")}</Typography>
          )}
          {!isSessionUser && (
            <Typography>{t("common.titles.accountDeleted")}</Typography>
          )}
        </div>
        {isSessionUser && (
          <form action={handleSubmit}>
            <Button type="submit">
              <Typography>{t("common.actions.restoreProfile")}</Typography>
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

ProfileFreezePageComponent.displayName = "ProfileFreezePage";

export const ProfileFreezePage = memo(ProfileFreezePageComponent);
