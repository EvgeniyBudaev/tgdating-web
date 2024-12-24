"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { Icon } from "@/app/uikit/components/icon";
import { ETheme } from "@/app/uikit/enums";
import "./Hamburger.scss";

type TProps = {
  onClick?: () => void;
  theme?: ETheme;
};

const HamburgerComponent: FC<TProps> = ({ onClick, theme }) => {
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
