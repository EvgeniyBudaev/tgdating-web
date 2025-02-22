"use client";

import clsx from "clsx";
import { forwardRef, memo } from "react";
import type { ForwardedRef } from "react";
import { CSSTransition } from "react-transition-group";
import type { TSidebarProps } from "@/app/uikit/components/sidebar/types";
import { TRANSITION } from "@/app/uikit/constants";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Sidebar.scss";

const SidebarComponent = forwardRef(
  (
    {
      children,
      className,
      dataTestId = "uikit__sidebar",
      isActive = false,
      onClose,
      theme,
      transition,
    }: TSidebarProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    return (
      <>
        <CSSTransition
          className={clsx("Sidebar", className, {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
          data-testid={dataTestId}
          in={isActive}
          nodeRef={ref}
          timeout={transition ?? TRANSITION}
          unmountOnExit
        >
          <div ref={ref}>{children}</div>
        </CSSTransition>
      </>
    );
  },
);

SidebarComponent.displayName = "Sidebar";

export const Sidebar = memo(SidebarComponent);
