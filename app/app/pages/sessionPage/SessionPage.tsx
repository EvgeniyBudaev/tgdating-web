"use client";

import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import type { TProfileList } from "@/app/api/profile/getProfileList/types";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { useTranslation } from "@/app/i18n/client";
import { SearchForm } from "@/app/entities/search/searchForm";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { Container } from "@/app/shared/components/container";
import { useNavigatorContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Distance } from "@/app/uikit/components/distance";
import { Heart } from "@/app/uikit/components/heart";
import { Online } from "@/app/uikit/components/online";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
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
  const navigator = useNavigatorContext();
  const { isSession, user, theme } = useTelegram();
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
          route: ERoutes.Started,
          lng,
        }),
      );
    }
  }, [isSession, isExistUser, lng, profileShortInfo?.telegramUserId, user?.id]);

  return (
    <div
      className={clsx("SessionPage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      {profileShortInfo && (
        <SearchForm
          lng={lng}
          profileShortInfo={profileShortInfo}
          theme={theme}
        />
      )}
      <div className="SessionPage-Inner">
        <div className="SessionPage-Background" />
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
              const distance = item?.distance
                ? getDistance(item.distance, t)
                : undefined;
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
                    <Heart isLiked={item.isLiked} />
                    <Distance distance={distance} theme={theme} />
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
    </div>
  );
};

SessionPageComponent.displayName = "SessionPage";

export const SessionPage = memo(SessionPageComponent);
