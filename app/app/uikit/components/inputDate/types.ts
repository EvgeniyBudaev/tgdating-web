import type { SyntheticEvent } from "react";

export type TInputDateProps = {
  className?: string;
  errors?: string | string[] | null;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onClick?: (event: SyntheticEvent) => void;
  onFieldClear?: (event: SyntheticEvent) => void;
  placeholder?: string;
  subTitle?: string;
  title?: string;
  value?: string | null;
};
