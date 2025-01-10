"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Gradient } from "@/app/uikit/components/gradient";
import { Icon } from "@/app/uikit/components/icon";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContentHeader.scss";

type TProps = {
  cancelButtonTitle?: string;
  onClick?: () => void;
  theme?: ETheme;
  title: string;
};

const SidebarContentHeaderComponent: FC<TProps> = ({
  cancelButtonTitle,
  onClick,
  theme,
  title,
}) => {
  const { t } = useTranslation("index");

  return (
    <div
      className={clsx("SidebarContentHeader", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <Gradient />
      <div className="SidebarContentHeader-Title">
        <Typography variant={ETypographyVariant.TextB2Regular}>
          {title}
        </Typography>
      </div>
      <div className="SidebarContentHeader-Control" onClick={onClick}>
        <Icon className="SidebarContentHeader-Cancel" type="ArrowBack" />
        <span className="SidebarContentHeader-Cancel-Title">
          <Typography>
            {cancelButtonTitle ?? t("common.actions.saveChanges")}
          </Typography>
        </span>
      </div>
      <div></div>
    </div>
  );
};

SidebarContentHeaderComponent.displayName = "SidebarContentHeader";

export const SidebarContentHeader = memo(SidebarContentHeaderComponent);
