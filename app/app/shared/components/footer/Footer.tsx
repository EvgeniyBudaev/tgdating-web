"use client";

import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { NavLink } from "@/app/shared/components/navLink";
import { useNavigatorContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { useHydrated } from "@/app/uikit/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums";
import "./Footer.scss";

type TProps = {
  lng: ELanguage;
};

const FooterComponent: FC<TProps> = ({ lng }) => {
  const navigator = useNavigatorContext();
  const router = useRouter();
  const pathname = usePathname();
  const { isSession, user, theme } = useTelegram();
  const { t } = useTranslation("index");
  const isHydrated = useHydrated();

  const telegramUserIdListPath = createPath(
    {
      route: ERoutes.Telegram,
      params: { telegramUserId: (user?.id ?? "").toString() },
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
    const pathProfileAdd = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });
    const pathProfileEdit = createPath({
      route: ERoutes.ProfileEdit,
      params: { telegramUserId: (user?.id ?? "").toString() },
      lng,
    });
    return pathname !== pathProfileAdd && pathname !== pathProfileEdit;
  }, [lng, pathname, user]);

  const handleBack = () => {
    router.back();
  };

  if (!isHydrated) return null;

  return (
    <div
      className={clsx("Footer", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <div className="Footer-Inner">
        {isSession && isFooter && (
          <>
            <NavLink
              className="Footer-Item"
              activeClassName="Footer-Item__isActive"
              href={telegramUserIdListPath}
            >
              <Icon className="Footer-Item-Icon" type="Home" />
              <Typography>{t("common.actions.main")}</Typography>
            </NavLink>
            <NavLink
              className="Footer-Item"
              activeClassName="Footer-Item__isActive"
              href={profileDetailPath}
            >
              <Icon className="Footer-Item-Icon" type="Person" />
              <Typography>{t("common.actions.profile")}</Typography>
            </NavLink>
            <div className="Footer-Item" onClick={handleBack}>
              <Icon className="Footer-Item-Icon" type="Undo" />
              <Typography>{t("common.actions.back")}</Typography>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

FooterComponent.displayName = "Footer";

export const Footer = memo(FooterComponent);
