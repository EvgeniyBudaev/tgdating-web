"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import { useRouter, useSearchParams } from "next/navigation";
import { type FC, memo, useActionState, useEffect } from "react";
import { EProfileRestoreFormFields } from "@/app/actions/profile/restoreProfile/enums";
import { restoreProfileAction } from "@/app/actions/profile/restoreProfile/restoreProfileAction";
import { useTranslation } from "@/app/i18n/client";
import { useProfileFreezeAccess } from "@/app/pages/profileFreezePage/hooks";
import type { TProfileFreezePageProps } from "@/app/pages/profileFreezePage/types";
import { Loader } from "@/app/shared/components/loader";
import { COUNTRY_CODE, INITIAL_FORM_STATE } from "@/app/shared/constants";
import {
  useAuthenticityTokenContext,
  useNavigatorContext,
} from "@/app/shared/context";
import { ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Button } from "@/app/uikit/components/button";
import { ButtonLink } from "@/app/uikit/components/button/buttonLink";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./ProfileFreezePage.scss";

const ProfileFreezePageComponent: FC<TProfileFreezePageProps> = (props) => {
  const { isBlocked, isFrozen, lng, telegramUserId } = props;
  const csrf = useAuthenticityTokenContext();
  const navigator = useNavigatorContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { initDataCrypt, isSession, user, theme } = useTelegram();
  const { t } = useTranslation("index");
  const isSessionUser = Boolean(
    telegramUserId && user?.id.toString() === telegramUserId,
  );
  const [state, formAction] = useActionState(
    restoreProfileAction,
    INITIAL_FORM_STATE,
  );

  useProfileFreezeAccess(props);

  useEffect(() => {
    if (!isNil(state?.data) && state.success && !state?.error) {
      const countryCode =
        navigator?.countryCode ?? params.get(COUNTRY_CODE) ?? lng;
      const query = {
        ...(navigator?.latitude
          ? { latitude: navigator.latitude.toString() }
          : {}),
        ...(navigator?.longitude
          ? { longitude: navigator.longitude.toString() }
          : {}),
        countryCode,
      };
      const path = createPath(
        {
          route: ERoutes.ProfileDetail,
          params: {
            telegramUserId: telegramUserId,
            viewedTelegramUserId: telegramUserId,
          },
          lng: lng,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [lng, state]);

  const handleSubmit = (formData: FormData) => {
    if (isSession) {
      const formDataDto = new FormData();
      formDataDto.append(
        EProfileRestoreFormFields.TelegramUserId,
        telegramUserId,
      );
      formDataDto.append(
        EProfileRestoreFormFields.TelegramInitDataCrypt,
        initDataCrypt ?? "",
      );
      formDataDto.append(EProfileRestoreFormFields.Csrf, csrf ?? "");
      // @ts-ignore
      formAction(formDataDto);
    }
  };

  if (isBlocked || !isFrozen) return <Loader />;

  return (
    <div
      className={clsx("ProfileFreezePage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
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
        {!isSessionUser && (
          <ButtonLink
            href={createPath({
              route: ERoutes.Telegram,
              params: {
                telegramUserId,
              },
              lng,
            })}
          >
            <Typography>OK</Typography>
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

ProfileFreezePageComponent.displayName = "ProfileFreezePage";

export const ProfileFreezePage = memo(ProfileFreezePageComponent);
