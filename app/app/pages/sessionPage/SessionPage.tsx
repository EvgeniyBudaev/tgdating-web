"use client";

import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import type { TProfileList } from "@/app/api/profile/getProfileList/types";
import { useTranslation } from "@/app/i18n/client";
import { SearchForm } from "@/app/entities/search/searchForm";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { SessionImage } from "@/app/pages/sessionPage/sessionImage";
import { Container } from "@/app/shared/components/container";
import { useShortInfoContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useScrollPosition, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import { notification } from "@/app/uikit/utils";
import "./SessionPage.scss";

type TProps = {
  isExistUser: boolean;
  isManyRequest: boolean;
  lng: ELanguage;
  profileList?: TProfileList;
};

const SessionPageComponent: FC<TProps> = ({
  isExistUser,
  isManyRequest,
  lng,
  profileList,
}) => {
  useScrollPosition();
  const shortInfo = useShortInfoContext();
  const { isSession, user, theme } = useTelegram();
  const { t } = useTranslation("index");
  const telegramUserId = (user?.id ?? "").toString();

  useEffect(() => {
    if (isManyRequest) {
      notification({
        title: t("errorBoundary.common.manyRequest"),
        type: "error",
      });
    }
  }, [isManyRequest]);

  useEffect(() => {
    if (shortInfo?.isFrozen) {
      redirect(
        createPath({
          route: ERoutes.ProfileDeleted,
          params: { telegramUserId: telegramUserId },
        }),
      );
    }
    if (shortInfo?.isBlocked) {
      redirect(
        createPath({
          route: ERoutes.ProfileBlocked,
          params: { telegramUserId: telegramUserId },
        }),
      );
    }
    if (!isExistUser) {
      return redirect(
        createPath({
          route: ERoutes.Started,
          lng,
        }),
      );
    }
  }, [isSession, isExistUser, lng, shortInfo, user?.id]);

  const list = [
    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },

    { url: "/assets/images/girl1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy1.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy2.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy3.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy4.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy5.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl6.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/boy6.jpg", isOnline: false, isLiked: false },
    {
      url: "/assets/images/girl7.jpg",
      isOnline: false,
      isLiked: false,
      telegramUserId: "9528767435",
    },
    { url: "/assets/images/boy7.jpg", isOnline: false, isLiked: false },
    { url: "/assets/images/girl8.jpg", isOnline: false, isLiked: false },
  ];

  return (
    <div
      className={clsx("SessionPage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      {shortInfo && (
        <SearchForm lng={lng} profileShortInfo={shortInfo} theme={theme} />
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
          <>
            <div className="SessionPage-List">
              {(profileList?.content ?? []).map((item, index) => {
                const isBlurImage = index > 36 && !shortInfo?.isPremium;
                const distance = !isNil(item?.distance)
                  ? getDistance(item.distance, t)
                  : undefined;
                return (
                  <SessionImage
                    distance={distance}
                    image={item}
                    isBlur={isBlurImage}
                    key={item.telegramUserId}
                    lng={lng}
                    telegramUserId={telegramUserId}
                    theme={theme}
                    viewedTelegramUserId={item.telegramUserId}
                  />
                );
              })}
            </div>
          </>
        )}
        <div className="SessionPage-List">
          {list.map((item, index) => (
            <SessionImage
              distance={100}
              image={item}
              isBlur={false}
              key={`${item}-${index}`}
              lng={lng}
              telegramUserId={telegramUserId}
              theme={theme}
              viewedTelegramUserId={"9528767435"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

SessionPageComponent.displayName = "SessionPage";

export const SessionPage = memo(SessionPageComponent);
