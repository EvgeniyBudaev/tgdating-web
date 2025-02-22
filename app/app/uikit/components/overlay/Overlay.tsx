"use client";

import clsx from "clsx";
import { memo, useRef } from "react";
import type { FC } from "react";
import { CSSTransition } from "react-transition-group";
import type { TOverlayProps } from "@/app/uikit/components/overlay/types";
import { TRANSITION } from "@/app/uikit/constants";
import "./Overlay.scss";

const OverlayComponent: FC<TOverlayProps> = ({
  className,
  dataTestId = "uikit__overlay",
  isActive = false,
  onClick,
  timeout = TRANSITION,
}) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      className={clsx("Overlay", className)}
      data-testid={dataTestId}
      in={isActive}
      nodeRef={nodeRef}
      onClick={onClick}
      timeout={timeout}
      unmountOnExit
    >
      <div ref={nodeRef} />
    </CSSTransition>
  );
};

OverlayComponent.displayName = "Overlay";

export const Overlay = memo(OverlayComponent);
