"use client";

import isEmpty from "lodash/isEmpty";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { type FC, useEffect } from "react";
import type { TProfileList } from "@/app/api/profile/list";
import { useTranslation } from "@/app/i18n/client";
import type { TFilter } from "@/app/api/profile/filter";
import { SearchForm } from "@/app/entities/search/searchForm";
import { Container } from "@/app/shared/components/container";
import { useNavigatorContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Online } from "@/app/uikit/components/online";
import { Typography } from "@/app/uikit/components/typography";
import "./SessionPage.scss";

type TProps = {
  isExistUser: boolean;
  lng: ELanguage;
  profileFilter?: TFilter;
  profileList?: TProfileList;
};

export const SessionPage: FC<TProps> = ({
  isExistUser,
  lng,
  profileFilter,
  profileList,
}) => {
  const navigator = useNavigatorContext();
  const { isSession, user } = useTelegram();
  const { t } = useTranslation("index");

  useEffect(() => {
    if (
      !isExistUser ||
      (isSession && user?.id.toString() !== profileFilter?.sessionId)
    ) {
      return redirect(
        createPath({
          route: ERoutes.ProfileAdd,
        }),
      );
    }
  }, [isSession, isExistUser, profileFilter?.sessionId, user?.id]);

  return (
    <div className="SessionPage">
      {profileFilter && <SearchForm lng={lng} profileFilter={profileFilter} />}
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
                      sessionId: user?.id ?? "",
                      viewedSessionId: item.sessionId,
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
                key={item.sessionId}
              >
                <div className="SessionPage-WrapperImage" key={item.sessionId}>
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
