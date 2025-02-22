import type { PropsWithChildren } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

export type TAccordionProps = {
  className?: string;
  dataTestId?: string;
  isActive?: boolean;
  onToggle?: () => void;
  theme?: ETheme;
  title?: string;
} & PropsWithChildren;
