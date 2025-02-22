import { createElement, memo } from "react";
import type { FC } from "react";
import { TYPOGRAPHY_THEMES } from "@/app/uikit/components/typography/constants";
import { ETypographyVariant } from "@/app/uikit/components/typography/enums";
import type { TTypographyProps } from "@/app/uikit/components/typography/types";
import "./Typography.scss";

const TypographyComponent: FC<TTypographyProps> = ({
  as = "span",
  children,
  dataTestId = "uikit__typography",
  htmlFor,
  variant = ETypographyVariant.TextB3Regular,
}) => {
  const currentTheme = TYPOGRAPHY_THEMES()[variant];

  const props = {
    className: currentTheme,
    "data-testid": dataTestId,
    ...(as === "label" && htmlFor && { htmlFor }),
  };

  return createElement(as, props, children);
};

TypographyComponent.displayName = "Typography";

export const Typography = memo(TypographyComponent);
