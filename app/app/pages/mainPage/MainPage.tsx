"use client";

import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import type { TProfileList } from "@/app/api/profile/list";
import { useTranslation } from "@/app/i18n/client";
import type { TFilter } from "@/app/api/profile/filter";
import { SearchForm } from "@/app/entities/search/searchForm";
import { Container } from "@/app/shared/components/container";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useFilter, useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Online } from "@/app/uikit/components/online";
import { Typography } from "@/app/uikit/components/typography";
import "./MainPage.scss";

type TProps = {
  lng: ELanguage;
  profileFilter?: TFilter;
  profileList?: TProfileList;
};

export const MainPage: FC<TProps> = ({ lng, profileFilter, profileList }) => {
  useFilter({ lng });
  const navigator = useNavigator({ lng });
  const { user } = useTelegram();
  const { t } = useTranslation("index");

  return (
    <div className="MainPage">
      {profileFilter && <SearchForm lng={lng} profileFilter={profileFilter} />}
      {isEmpty(profileList?.content) && (
        <Container>
          <div className="MainPage-IsEmpty">
            <Typography>{t("common.titles.isEmptyList")}</Typography>
          </div>
        </Container>
      )}
      {!isEmpty(profileList?.content) && (
        <div className="MainPage-List">
          {(profileList?.content ?? []).map((item) => {
            return (
              <Link
                href={{
                  pathname: createPath({
                    route: ERoutes.Profile,
                    params: { viewedSessionId: item.sessionId },
                    lng: lng,
                  }),
                  query: {
                    latitude: (navigator?.latitudeGPS ?? "").toString(),
                    longitude: (navigator?.longitudeGPS ?? "").toString(),
                    sessionId: user?.id,
                  },
                }}
                key={item.sessionId}
              >
                <div className="MainPage-WrapperImage" key={item.sessionId}>
                  <Online
                    classes={{ root: "MainPage-Online" }}
                    isOnline={item.isOnline}
                  />
                  <Image
                    alt=""
                    className="MainPage-Image"
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
