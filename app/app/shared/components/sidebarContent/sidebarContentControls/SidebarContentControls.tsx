"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/app/uikit/components/button";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContentControls.scss";

type TProps = {
  title?: string;
  onClick?: () => void;
  theme?: ETheme;
};

const SidebarContentControlsComponent: FC<TProps> = ({
  onClick,
  theme,
  title,
}) => {
  const { t } = useTranslation("index");

  return (
    <div
      className={clsx("SidebarContentControls", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      <Button onClick={onClick} type="button">
        <Typography>{title}</Typography>
      </Button>
    </div>
  );
};

SidebarContentControlsComponent.displayName = "SidebarContentControls";

export const SidebarContentControls = memo(SidebarContentControlsComponent);
