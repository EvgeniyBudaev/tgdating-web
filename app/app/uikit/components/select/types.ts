import type { ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

export type TSelectOption = {
  label: string;
  value: string | number;
};

type TClasses = {
  sidebar?: string;
};

export type TSelectProps = {
  children?: ReactNode;
  classes?: TClasses;
  errors?: string | string[] | null;
  headerTitle?: string | number;
  isSidebarOpen?: boolean;
  label?: string | ReactNode;
  name?: string;
  onHeaderClick?: () => void;
  onSidebarClose?: () => void;
  subLabel?: string;
  theme?: ETheme;
};
