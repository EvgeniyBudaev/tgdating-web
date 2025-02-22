import type { DOMAttributes } from "react";

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
  className?: string;
  dataTestId?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
}
