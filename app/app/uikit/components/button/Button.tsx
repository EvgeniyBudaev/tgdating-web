"use client";

import clsx from "clsx";
import { memo, type FC } from "react";
import type { IButtonProps } from "@/app/uikit/components/button/types";
import "./Button.scss";

const ButtonComponent: FC<IButtonProps> = ({
  className,
  children,
  dataTestId = "uikit__button",
  isDisabled = false,
  isLoading = false,
  type,
  ...rest
}) => {
  return (
    <button
      className={clsx("Button", className, {
        Button__disabled: isDisabled,
        Button__loading: isLoading,
      })}
      data-testid={dataTestId}
      disabled={isDisabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

ButtonComponent.displayName = "Button";

export const Button = memo(ButtonComponent);
