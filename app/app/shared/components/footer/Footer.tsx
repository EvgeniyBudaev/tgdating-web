"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { type FC, useEffect, useMemo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { NavLink } from "@/app/shared/components/navLink";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import {
  useNavigator,
  useProfileShortInfo,
  useQueryURL,
  useTelegram,
} from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Avatar } from "@/app/uikit/components/avatar";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./Footer.scss";

type TProps = {
  lng: ELanguage;
};

export const Footer: FC<TProps> = ({ lng }) => {
  const navigator = useNavigator({ lng });
  const pathname = usePathname();
  const { isSession, user } = useTelegram();
  const { t } = useTranslation("index");
  const { queryURL } = useQueryURL({ lng });
  const rootUrl = `/${lng}${queryURL}`;
  const { isNotFound, profileShortInfo: profile } = useProfileShortInfo({
    lng,
  });
  const isPermissions = !profile?.isBlocked && !profile?.isDeleted;

  const isProfileDetailPage = useMemo(() => {
    if (!profile?.sessionId) return false;
    const path = createPath({
      route: ERoutes.Profile,
      params: { sessionId: profile.sessionId },
    });
    return pathname === `/${lng}${path}`;
  }, [lng, pathname, profile?.sessionId]);

  useEffect(() => {
    const pathAdd = createPath({
      route: ERoutes.ProfileAdd,
    });
    const pathEdit = createPath({
      route: ERoutes.ProfileEdit,
      params: { sessionId: user.id },
    });
    if (
      isNotFound &&
      pathname !== `/${lng}${pathAdd}` &&
      pathname !== `/${lng}${pathEdit}`
    ) {
      redirect(pathAdd);
    }
  }, [isNotFound, pathname]);

  return (
    <div className="Footer">
      {isSession && isPermissions && !isNotFound && (
        <>
          <div className="Footer-Item">
            <NavLink activeClassName="Footer-Link__isActive" href={rootUrl}>
              <Icon type="Search" />
            </NavLink>
          </div>
          <div className="Footer-Item Footer-Item-Avatar">
            <DropDown>
              <DropDown.Button>
                <div className="Footer-Avatar">
                  {profile?.imageUrl && (
                    <Avatar size={32} image={profile?.imageUrl} />
                  )}
                </div>
              </DropDown.Button>
              <DropDown.Panel>
                <>
                  <div className="DropDown-Menu">
                    {!isProfileDetailPage && (
                      <Link
                        className="DropDown-MenuItem"
                        href={{
                          pathname: createPath({
                            route: ERoutes.Profile,
                            params: { viewedSessionId: user?.id ?? "" },
                            lng: lng,
                          }),
                          query: {
                            latitude: (navigator?.latitudeGPS ?? "").toString(),
                            longitude: (
                              navigator?.longitudeGPS ?? ""
                            ).toString(),
                            sessionId: user?.id,
                          },
                        }}
                      >
                        <Typography>
                          {t("common.actions.profileDetail")}
                        </Typography>
                      </Link>
                    )}
                  </div>
                  <div className="DropDown-Menu">
                    <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
                      <Typography>{t("common.actions.cancel")}</Typography>
                    </div>
                  </div>
                </>
              </DropDown.Panel>
            </DropDown>
          </div>
        </>
      )}
    </div>
  );
};
