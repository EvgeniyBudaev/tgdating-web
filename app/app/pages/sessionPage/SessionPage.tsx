"use client";

import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import type { TProfileList } from "@/app/api/profile/getProfileList/types";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { useTranslation } from "@/app/i18n/client";
import { SearchForm } from "@/app/entities/search/searchForm";
import { Container } from "@/app/shared/components/container";
import { useNavigatorContext, useTelegramContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions, useThemeContext } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Online } from "@/app/uikit/components/online";
import { Typography } from "@/app/uikit/components/typography";
import { notification } from "@/app/uikit/utils";
import "./SessionPage.scss";

type TProps = {
  isExistUser: boolean;
  isManyRequest: boolean;
  lng: ELanguage;
  profileList?: TProfileList;
  profileShortInfo?: TProfileShortInfo;
};

const SessionPageComponent: FC<TProps> = ({
  isExistUser,
  isManyRequest,
  lng,
  profileList,
  profileShortInfo,
}) => {
  useCheckPermissions({ lng });
  const navigator = useNavigatorContext();
  const telegram = useTelegramContext();
  const themeState = useThemeContext();
  const theme = themeState?.theme;
  const isSession = telegram?.isSession;
  const user = telegram?.user;
  const { t } = useTranslation("index");

  useEffect(() => {
    if (isManyRequest) {
      notification({
        title: t("errorBoundary.common.manyRequest"),
        type: "error",
      });
    }
  }, [isManyRequest]);

  useEffect(() => {
    if (
      !isExistUser ||
      (isSession && user?.id.toString() !== profileShortInfo?.telegramUserId)
    ) {
      return redirect(
        createPath({
          route: ERoutes.ProfileAdd,
        }),
      );
    }
  }, [isSession, isExistUser, profileShortInfo?.telegramUserId, user?.id]);

  return (
    <div className="SessionPage">
      {profileShortInfo && (
        <SearchForm
          lng={lng}
          profileShortInfo={profileShortInfo}
          theme={theme}
        />
      )}
      {isEmpty(profileList?.content) && (
        <Container>
          <div className="SessionPage-IsEmpty">
            <Typography>{t("common.titles.isEmptyList")}</Typography>
          </div>
        </Container>
      )}
      {!isEmpty(profileList?.content) && (
        <div className="SessionPage-List">
          {(profileList?.content ?? []).map((item) => {
            return (
              <Link
                href={{
                  pathname: createPath({
                    route: ERoutes.ProfileDetail,
                    params: {
                      telegramUserId: user?.id ?? "",
                      viewedTelegramUserId: item.telegramUserId,
                    },
                    lng: lng,
                  }),
                  query: {
                    ...(navigator?.latitude
                      ? { latitude: navigator?.latitude.toString() }
                      : {}),
                    ...(navigator?.longitude
                      ? { longitude: navigator?.longitude.toString() }
                      : {}),
                  },
                }}
                key={item.telegramUserId}
              >
                <div
                  className="SessionPage-WrapperImage"
                  key={item.telegramUserId}
                >
                  <Online
                    classes={{ root: "SessionPage-Online" }}
                    isOnline={item.isOnline}
                  />
                  <Image
                    alt=""
                    className="SessionPage-Image"
                    priority={true}
                    height={120}
                    width={150}
                    src={item.url}
                    quality={100}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

SessionPageComponent.displayName = "SessionPage";

export const SessionPage = memo(SessionPageComponent);
