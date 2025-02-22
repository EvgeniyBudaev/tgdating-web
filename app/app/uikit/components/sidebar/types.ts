import type { MouseEvent, ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

export type TSidebarProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  isActive?: boolean;
  onClose?: (event: MouseEvent) => void;
  theme?: ETheme;
  transition?: number;
};
