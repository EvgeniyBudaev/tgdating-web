import clsx from "clsx";
import { ETypographyVariant } from "@/app/uikit/components/typography/enums";

export const TYPOGRAPHY_THEMES = () => {
  return {
    [ETypographyVariant.TextH3Medium]: clsx("Typography text-h3 text-medium"),
    [ETypographyVariant.TextH4Medium]: clsx("Typography text-h4 text-medium"),
    [ETypographyVariant.TextB2Regular]: clsx("Typography text-b2 text-regular"),
    [ETypographyVariant.TextB3Regular]: clsx("Typography text-b3 text-regular"),
    [ETypographyVariant.TextB4Regular]: clsx("Typography text-b4 text-regular"),
  };
};
