"use client";

import clsx from "clsx";
import { type FC, memo, type ReactNode } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Button } from "@/app/uikit/components/button";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContentControls.scss";

type TProps = {
  onCancel?: () => void;
  onClick?: () => void;
  postfixIconSubmit?: ReactNode | ReactNode[];
  theme?: ETheme;
  title?: string;
  typeButton?: "submit" | "reset" | "button";
};

const SidebarContentControlsComponent: FC<TProps> = ({
  onCancel,
  onClick,
  postfixIconSubmit,
  theme,
  title,
  typeButton,
}) => {
  const { t } = useTranslation("index");

  return (
    <div
      className={clsx("SidebarContentControls", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      {onCancel && (
        <div className="SidebarContentControls-Button">
          <Button onClick={onCancel} type="button">
            <Typography>{t("common.actions.cancel")}</Typography>
          </Button>
        </div>
      )}
      <div className="SidebarContentControls-Button">
        <Button onClick={onClick} type={typeButton ?? "button"}>
          <Typography>{title}</Typography>
          {postfixIconSubmit}
        </Button>
      </div>
    </div>
  );
};

SidebarContentControlsComponent.displayName = "SidebarContentControls";

export const SidebarContentControls = memo(SidebarContentControlsComponent);
