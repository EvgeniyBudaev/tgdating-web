import clsx from "clsx";
import { ETypographyVariant } from "@/app/uikit/components/typography/enums";

export const TYPOGRAPHY_THEMES = () => {
  return {
    [ETypographyVariant.TextH3Medium]: clsx("Typography text-h3 text-medium"),
    [ETypographyVariant.TextH4Medium]: clsx("Typography text-h4 text-medium"),
    [ETypographyVariant.TextH4Bold]: clsx("Typography text-h4 text-bold"),
    [ETypographyVariant.TextB1Regular]: clsx("Typography text-b1 text-regular"),
    [ETypographyVariant.TextB1Medium]: clsx("Typography text-b1 text-medium"),
    [ETypographyVariant.TextB1Bold]: clsx("Typography text-b1 text-bold"),
    [ETypographyVariant.TextB2Regular]: clsx("Typography text-b2 text-regular"),
    [ETypographyVariant.TextB2Bold]: clsx("Typography text-b2 text-bold"),
    [ETypographyVariant.TextB3Regular]: clsx("Typography text-b3 text-regular"),
    [ETypographyVariant.TextB3Medium]: clsx("Typography text-b3 text-medium"),
    [ETypographyVariant.TextB3Bold]: clsx("Typography text-b3 text-bold"),
    [ETypographyVariant.TextB4Regular]: clsx("Typography text-b4 text-regular"),
  };
};
