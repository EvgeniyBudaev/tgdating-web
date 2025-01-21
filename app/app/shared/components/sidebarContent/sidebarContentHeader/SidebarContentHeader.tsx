"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { Gradient } from "@/app/uikit/components/gradient";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SidebarContentHeader.scss";

type TProps = {
  theme?: ETheme;
  title: string;
};

const SidebarContentHeaderComponent: FC<TProps> = ({ theme, title }) => {
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
    </div>
  );
};

SidebarContentHeaderComponent.displayName = "SidebarContentHeader";

export const SidebarContentHeader = memo(SidebarContentHeaderComponent);
