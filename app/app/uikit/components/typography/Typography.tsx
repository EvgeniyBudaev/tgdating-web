import { createElement } from "react";
import type { FC, ReactNode } from "react";
import { TYPOGRAPHY_THEMES } from "@/app/uikit/components/typography/constants";
import { ETypographyVariant } from "@/app/uikit/components/typography/enums";
import "./Typography.scss";

type TProps = {
  as?: string;
  children?: ReactNode;
  dataTestId?: string;
  htmlFor?: string;
  variant?: ETypographyVariant;
};

export const Typography: FC<TProps> = ({
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
