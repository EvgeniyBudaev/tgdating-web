"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import { type FC, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import type {
  TDropDownButtonProps,
  TDropDownPanelProps,
  TDropDownProps,
} from "@/app/uikit/components/dropDown/types";
import { Overlay } from "@/app/uikit/components/overlay";
import { TRANSITION } from "@/app/uikit/constants";
import { DropDownProvider } from "@/app/uikit/context";
import { ETheme } from "@/app/uikit/enums/theme";
import { useDropDown, useDropDownContext } from "@/app/uikit/hooks";
import "./DropDown.scss";

export const DropDown = ({
  children,
  classes,
  dataTestId = "uikit__dropDown",
  isCanClickOutside = true,
  theme,
  transition,
}: TDropDownProps): JSX.Element => {
  const dropDownState = useDropDown({ isCanClickOutside });

  return (
    <DropDownProvider value={dropDownState}>
      <Overlay
        timeout={transition ?? TRANSITION}
        isActive={dropDownState.isDropDownOpen}
      />
      <div
        className={clsx("DropDown", classes?.dropDown, {
          ["theme-dark"]: theme === ETheme.Dark,
        })}
        data-testid={dataTestId}
      >
        {children}
      </div>
    </DropDownProvider>
  );
};

const DropDownButton: FC<TDropDownButtonProps> = ({
  children,
  classes,
  onOpen,
}) => {
  const dropDownState = useDropDownContext();

  const handleOpen = () => {
    dropDownState?.onOpen?.();
    onOpen?.();
  };

  return (
    <div
      className={clsx("DropDown-Button", classes?.dropDownButton)}
      onClick={handleOpen}
      ref={dropDownState?.refButtonDropDown}
    >
      {children}
    </div>
  );
};

DropDown.Button = DropDownButton;

const DropDownPanel: FC<TDropDownPanelProps> = ({
  children,
  classes,
  dataTestId = "uikit__dropDown",
  isOpen,
  onClose,
  transition,
}) => {
  const dropDownState = useDropDownContext();

  const handleClose = () => {
    if (isNil(isOpen)) {
      dropDownState?.onClose?.();
    } else {
      onClose?.();
    }
  };

  useEffect(() => {
    if (!isNil(isOpen) && !isOpen) {
      dropDownState?.onClose?.();
    }
  }, [isOpen]);

  return (
    <CSSTransition
      className={clsx("DropDown-Panel", classes?.dropDownPanel)}
      data-testid={dataTestId}
      in={isOpen ?? dropDownState?.isDropDownOpen}
      nodeRef={dropDownState?.refPanelDropDown}
      onClick={handleClose}
      timeout={transition ?? TRANSITION}
      unmountOnExit
    >
      <div ref={dropDownState?.refPanelDropDown}>{children}</div>
    </CSSTransition>
  );
};

DropDown.Panel = DropDownPanel;
