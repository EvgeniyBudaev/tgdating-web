"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import type { THamburgerProps } from "@/app/uikit/components/hamburger/types";
import { Icon } from "@/app/uikit/components/icon";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Hamburger.scss";

const HamburgerComponent: FC<THamburgerProps> = ({ onClick, theme }) => {
  return (
    <div
      className={clsx("Hamburger", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
      onClick={onClick}
    >
      <Icon className="Hamburger-Icon" type="MoreHoriz" />
    </div>
  );
};

HamburgerComponent.displayName = "Hamburger";

export const Hamburger = memo(HamburgerComponent);
