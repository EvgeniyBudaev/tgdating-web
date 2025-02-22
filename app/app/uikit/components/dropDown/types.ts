import type { ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

export type TDropDownClasses = {
  dropDown?: string;
  dropDownPanel?: string;
  dropDownButton?: string;
};

export type TDropDownProps = {
  children?: ReactNode;
  classes?: TDropDownClasses;
  dataTestId?: string;
  isCanClickOutside?: boolean;
  theme?: ETheme;
  transition?: number;
};

export type TDropDownButtonProps = {
  children?: ReactNode;
  classes?: TDropDownClasses;
  onOpen?: () => void;
};

export type TDropDownPanelProps = {
  children?: ReactNode;
  classes?: TDropDownClasses;
  dataTestId?: string;
  isOpen?: boolean;
  onClose?: () => void;
  transition?: number;
};
