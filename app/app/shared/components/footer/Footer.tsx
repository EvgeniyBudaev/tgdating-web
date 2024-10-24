"use client";

import { useParams, usePathname } from "next/navigation";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { NavLink } from "@/app/shared/components/navLink";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { useHydrated } from "@/app/uikit/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./Footer.scss";

type TProps = {
  lng: ELanguage;
};

const FooterComponent: FC<TProps> = ({ lng }) => {
  const navigator = useNavigator({ lng });
  const params = useParams();
  const pathname = usePathname();
  const { isSession, user } = useTelegram();
  const { t } = useTranslation("index");
  const isHydrated = useHydrated();

  const sessionPath = createPath(
    {
      route: ERoutes.Session,
      params: { sessionId: (user?.id ?? "").toString() },
      lng: lng,
    },
    {
      ...(navigator?.latitudeGPS
        ? { latitude: navigator?.latitudeGPS.toString() }
        : {}),
      ...(navigator?.longitudeGPS
        ? { longitude: navigator?.longitudeGPS.toString() }
        : {}),
    },
  );

  const profileDetailPath = createPath(
    {
      route: ERoutes.ProfileDetail,
      params: {
        sessionId: (user?.id ?? "").toString(),
        viewedSessionId: (user?.id ?? "").toString(),
      },
      lng: lng,
    },
    {
      ...(navigator?.latitudeGPS
        ? { latitude: navigator?.latitudeGPS.toString() }
        : {}),
      ...(navigator?.longitudeGPS
        ? { longitude: navigator?.longitudeGPS.toString() }
        : {}),
    },
  );

  const isFooter = useMemo(() => {
    const path = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });
    return pathname !== path;
  }, [lng, pathname]);

  if (!isHydrated) return null;

  return (
    <div className="Footer">
      {isSession && isFooter && (
        <>
          <NavLink
            className="Footer-Item"
            activeClassName="Footer-Item__isActive"
            href={sessionPath}
          >
            <Icon className="Footer-Item-Icon" type="Search" />
            <Typography>{t("common.actions.search")}</Typography>
          </NavLink>
          <NavLink
            className="Footer-Item"
            activeClassName="Footer-Item__isActive"
            href={profileDetailPath}
          >
            <Icon className="Footer-Item-Icon" type="Person" />
            <Typography>{t("common.actions.profile")}</Typography>
          </NavLink>
        </>
      )}
    </div>
  );
};

FooterComponent.displayName = "Footer";

export const Footer = memo(FooterComponent);
