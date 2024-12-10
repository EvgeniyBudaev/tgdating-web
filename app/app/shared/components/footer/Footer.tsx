"use client";

import { usePathname } from "next/navigation";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { NavLink } from "@/app/shared/components/navLink";
import { useNavigatorContext, useTelegramContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { convertToUrlSearchParams, createPath } from "@/app/shared/utils";
import { useHydrated } from "@/app/uikit/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./Footer.scss";
import { useQueryURL } from "@/app/shared/hooks";

type TProps = {
  lng: ELanguage;
};

const FooterComponent: FC<TProps> = ({ lng }) => {
  const navigator = useNavigatorContext();
  const pathname = usePathname();
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const user = telegram?.user;
  const { t } = useTranslation("index");
  const isHydrated = useHydrated();
  const { getQuery } = useQueryURL({ lng });
  const params = getQuery();

  const telegramUserIdListPath = createPath(
    {
      route: ERoutes.Telegram,
      params: { telegramUserId: (user?.id ?? "").toString() },
      lng: lng,
    },
    params,
    // {
    //   ...(navigator?.latitude
    //     ? { latitude: navigator?.latitude.toString() }
    //     : {}),
    //   ...(navigator?.longitude
    //     ? { longitude: navigator?.longitude.toString() }
    //     : {}),
    // },
  );

  const profileDetailPath = createPath(
    {
      route: ERoutes.ProfileDetail,
      params: {
        telegramUserId: (user?.id ?? "").toString(),
        viewedTelegramUserId: (user?.id ?? "").toString(),
      },
      lng: lng,
    },
    {
      ...(navigator?.latitude
        ? { latitude: navigator?.latitude.toString() }
        : {}),
      ...(navigator?.longitude
        ? { longitude: navigator?.longitude.toString() }
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
            href={telegramUserIdListPath}
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
