import type { ReactNode } from "react";
import type { PopperProps } from "react-popper";
import { ETheme } from "@/app/uikit/enums/theme";

export type TModifiers = PopperProps<any>["modifiers"];
export type TPlacement = PopperProps<any>["placement"];

export type TClasses = {
  root?: string;
  arrow?: string;
  children?: ReactNode;
  popperContent?: string;
  popperElement?: string;
  referenceElement?: string;
};

export type TTooltipProps = {
  children?: ReactNode;
  classes?: TClasses;
  dataTestId?: string;
  isOpen?: boolean;
  isVisible?: boolean;
  message: ReactNode;
  modifiers?: TModifiers;
  onClose?: () => void;
  placement?: TPlacement;
  timerDelay?: number;
  theme?: ETheme;
  showTimerDelay?: number;
};
