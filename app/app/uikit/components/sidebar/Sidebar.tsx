"use client";

import clsx from "clsx";
import { forwardRef, memo } from "react";
import type { MouseEvent, ForwardedRef, ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import { TRANSITION } from "@/app/uikit/constants";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Sidebar.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  isActive?: boolean;
  onClose?: (event: MouseEvent) => void;
  ref: ForwardedRef<HTMLDivElement>;
  theme?: ETheme;
  transition?: number;
};

const SidebarComponent = forwardRef(
  // @ts-ignore
  (
    {
      children,
      className,
      dataTestId = "uikit__sidebar",
      isActive = false,
      onClose,
      theme,
      transition,
    }: TProps,
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
