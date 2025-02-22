import type { ReactNode } from "react";
import { ETypographyVariant } from "@/app/uikit/components/typography/enums";

export type TTypographyProps = {
  as?: string;
  children?: ReactNode;
  dataTestId?: string;
  htmlFor?: string;
  variant?: ETypographyVariant;
};
