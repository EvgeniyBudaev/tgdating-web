"use client";

import { type FC, memo } from "react";
import { Icon } from "@/app/uikit/components/icon";
import "./Hamburger.scss";

type TProps = {
  onClick?: () => void;
};

const HamburgerComponent: FC<TProps> = ({ onClick }) => {
  return (
    <div className="Hamburger" onClick={onClick}>
      <Icon type="MoreHoriz" />
    </div>
  );
};

HamburgerComponent.displayName = "Hamburger";

export const Hamburger = memo(HamburgerComponent);
