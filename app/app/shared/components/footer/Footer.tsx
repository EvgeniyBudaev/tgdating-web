"use client";

import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type FC, memo, useMemo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { NavLink } from "@/app/shared/components/navLink";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import type { TTelegramUser } from "@/app/shared/hooks/useTelegram";
import { createPath } from "@/app/shared/utils";
import { useNavigatorQuery, useScrollPosition } from "@/app/shared/hooks";
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
  const { query } = useNavigatorQuery();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { hasScroll, saveScrollPosition, scrollUp } = useScrollPosition();
  const { t } = useTranslation("index");
  const telegramUserId = (user?.id ?? "").toString();

  const pathOptions = useMemo(() => {
    const pathProfileAdd = createPath(
      {
        route: ERoutes.ProfileAdd,
        lng,
      },
      query,
    );

    const pathProfileEdit = createPath(
      {
        route: ERoutes.ProfileEdit,
        params: { telegramUserId },
        lng,
      },
      query,
    );

    const telegramUserIdListPath = createPath(
      {
        route: ERoutes.Telegram,
        params: { telegramUserId },
        lng,
      },
      query,
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
      query,
    );

    const profileFrozenPath = createPath(
      {
        route: ERoutes.ProfileFrozen,
        params: {
          telegramUserId,
        },
        lng,
      },
      query,
    );

    const browserPath = createPath({
      route: ERoutes.Browser,
      lng,
    });

    const devicePath = createPath({
      route: ERoutes.Device,
      lng,
    });

    const rootPath = createPath({
      route: ERoutes.Root,
      lng,
    });

    const mainPath = createPath(
      {
        route: ERoutes.Main,
        params: {
          telegramUserId,
        },
        lng,
      },
      query,
    );

    const startedPath = createPath(
      {
        route: ERoutes.Started,
        lng,
      },
      query,
    );

    const fullPath = params.size > 0 ? `${pathname}?${params}` : pathname;

    return {
      isFooter:
        fullPath !== pathProfileAdd &&
        fullPath !== pathProfileEdit &&
        fullPath !== profileFrozenPath &&
        fullPath !== browserPath &&
        fullPath !== devicePath &&
        fullPath !== rootPath &&
        fullPath !== mainPath &&
        fullPath !== startedPath,
      telegramUserIdListPath,
      profileDetailPath,
    };
  }, [lng, params, pathname, telegramUserId, user]);

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
