"use client";

import clsx from "clsx";
import { memo, type FC, type DOMAttributes } from "react";
import "./Button.scss";

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  dataTestId?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
}

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

export const Button = memo(ButtonComponent);
