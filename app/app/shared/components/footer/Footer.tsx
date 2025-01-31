"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { NavLink } from "@/app/shared/components/navLink";
import { CITY, COUNTRY_CODE, COUNTRY_NAME } from "@/app/shared/constants";
import { useNavigatorContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import type { TTelegramUser } from "@/app/shared/hooks/useTelegram";
import { createPath } from "@/app/shared/utils";
import { useScrollPosition } from "@/app/shared/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Footer.scss";

type TProps = {
  isPremium?: boolean;
  isSession: boolean;
  lng: ELanguage;
  theme: ETheme;
  user: TTelegramUser;
};

const FooterComponent: FC<TProps> = ({
  isPremium,
  isSession,
  lng,
  theme,
  user,
}) => {
  const navigator = useNavigatorContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { hasScroll, saveScrollPosition, scrollUp } = useScrollPosition();
  const { t } = useTranslation("index");
  const telegramUserId = (user?.id ?? "").toString();
  const countryCode = navigator?.countryCode ?? params.get(COUNTRY_CODE);
  const countryName = navigator?.countryName ?? params.get(COUNTRY_NAME);
  const city = navigator?.city ?? params.get(CITY);

  const pathOptions = useMemo(() => {
    const pathProfileAdd = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });

    const pathProfileEdit = createPath({
      route: ERoutes.ProfileEdit,
      params: { telegramUserId },
      lng,
    });

    const telegramUserIdListPath = createPath(
      {
        route: ERoutes.Telegram,
        params: { telegramUserId },
        lng,
      },
      {
        ...(navigator?.latitude
          ? { latitude: navigator?.latitude.toString() }
          : {}),
        ...(navigator?.longitude
          ? { longitude: navigator?.longitude.toString() }
          : {}),
        ...(countryCode && { countryCode: countryCode }),
        ...(countryName && { countryName: countryName }),
        ...(city && { city: city }),
      },
    );

    const profileDetailPath = createPath(
      {
        route: ERoutes.ProfileDetail,
        params: {
          telegramUserId,
          viewedTelegramUserId: telegramUserId,
        },
        lng,
      },
      {
        ...(navigator?.latitude
          ? { latitude: navigator?.latitude.toString() }
          : {}),
        ...(navigator?.longitude
          ? { longitude: navigator?.longitude.toString() }
          : {}),
        ...(countryCode && { countryCode: countryCode }),
        ...(countryName && { countryName: countryName }),
        ...(city && { city: city }),
      },
    );

    const profileFrozenPath = createPath({
      route: ERoutes.ProfileFrozen,
      params: {
        telegramUserId,
      },
      lng,
    });

    return {
      isFooter:
        pathname !== pathProfileAdd &&
        pathname !== pathProfileEdit &&
        pathname !== profileFrozenPath,
      telegramUserIdListPath,
      profileDetailPath,
    };
  }, [lng, pathname, telegramUserId, user]);

  const isScrollUpShowButton =
    hasScroll &&
    pathname ===
      createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId },
        lng,
      });

  const handleBack = () => {
    router.back();
  };

  if (!pathOptions.isFooter || !isSession) return null;

  return (
    <div
      className={clsx("Footer", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <div className="Footer-Inner">
        <NavLink
          className="Footer-Item"
          activeClassName="Footer-Item__isActive"
          href={pathOptions.telegramUserIdListPath}
          pathname={pathname}
        >
          <Icon className="Footer-Item-Icon" type="Home" />
          <Typography>{t("common.actions.main")}</Typography>
        </NavLink>
        <NavLink
          className="Footer-Item"
          activeClassName="Footer-Item__isActive"
          href={pathOptions.profileDetailPath}
          onClick={saveScrollPosition}
          pathname={pathname}
        >
          {isPremium && <Icon className="Footer-Icon-Crown" type="Crown" />}
          <Icon className="Footer-Item-Icon" type="Person" />
          <Typography>{t("common.actions.profile")}</Typography>
        </NavLink>
        <div className="Footer-Item" onClick={handleBack}>
          <Icon className="Footer-Item-Icon" type="Undo" />
          <Typography>{t("common.actions.back")}</Typography>
        </div>
        {isScrollUpShowButton && (
          <div className="Footer-Item" onClick={scrollUp}>
            <Icon className="Footer-Item-Icon" type="ArrowUp" />
            <Typography>{t("common.actions.up")}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

FooterComponent.displayName = "Footer";

export const Footer = memo(FooterComponent);
