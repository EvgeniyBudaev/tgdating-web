import type { ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

type IModalSize = "medium";

type TClasses = {
  modal?: string;
};

export type TModalProps = {
  children?: ReactNode;
  classes?: TClasses;
  className?: string;
  dataTestId?: string;
  isOpen: boolean;
  onCloseModal: () => void;
  showCloseIcon?: boolean;
  size?: IModalSize;
  theme?: ETheme;
};
