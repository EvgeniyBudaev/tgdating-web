"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import type { TProfileDeletedPageProps } from "@/app/pages/profileDeletedPage/types";
import { ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ButtonLink } from "@/app/uikit/components/button/buttonLink";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./ProfileDeletedPage.scss";

const ProfileDeletedPageComponent: FC<TProfileDeletedPageProps> = (props) => {
  const { lng, telegramUserId } = props;
  const { theme } = useTelegram();
  const { t } = useTranslation("index");

  return (
    <div
      className={clsx("ProfileDeletedPage", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <div className="ProfileDeletedPage-Inner">
        <div className="ProfileDeletedPage-Title">
          <Typography>{t("common.titles.accountDeleted")}</Typography>
        </div>
        <ButtonLink
          href={createPath({
            route: ERoutes.Telegram,
            params: {
              telegramUserId,
            },
            lng,
          })}
        >
          <Typography>OK</Typography>
        </ButtonLink>
      </div>
    </div>
  );
};

ProfileDeletedPageComponent.displayName = "ProfileDeletedPage";

export const ProfileDeletedPage = memo(ProfileDeletedPageComponent);
