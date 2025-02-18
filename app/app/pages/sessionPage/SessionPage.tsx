"use client";

import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { SearchForm } from "@/app/entities/search/searchForm";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { useSessionPageAccess } from "@/app/pages/sessionPage/hooks";
import { SessionImage } from "@/app/pages/sessionPage/sessionImage";
import type { TSessionPageProps } from "@/app/pages/sessionPage/types";
import { Container } from "@/app/shared/components/container";
import { Loader } from "@/app/shared/components/loader";
import { useShortInfoContext } from "@/app/shared/context";
import { useTelegram } from "@/app/shared/hooks";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SessionPage.scss";

const SessionPageComponent: FC<TSessionPageProps> = (props) => {
  const { isExistUser, isUnauthorized, lng, profileList, telegramUserId } =
    props;
  const shortInfo = useShortInfoContext();
  const { theme } = useTelegram();
  const { t } = useTranslation("index");

  useSessionPageAccess({ ...props, shortInfo });

  if (
    shortInfo?.isBlocked ||
    shortInfo?.isFrozen ||
    !isExistUser ||
    isUnauthorized
  )
    return <Loader />;

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
                //const isBlurImage = index > 36 && !shortInfo?.isPremium;
                const isBlurImage = false;
                const distance = getDistance({
                  value: item.distance,
                  t,
                  measurement: shortInfo?.measurement,
                });
                return (
                  <SessionImage
                    distance={distance}
                    image={item}
                    isBlur={isBlurImage}
                    key={item.telegramUserId}
                    lastOnline={item.lastOnline}
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
      </div>
    </div>
  );
};

SessionPageComponent.displayName = "SessionPage";

export const SessionPage = memo(SessionPageComponent);
