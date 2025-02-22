import type { Locale } from "date-fns";
import type { SyntheticEvent } from "react";

type TClasses = {
  inputDateField?: string;
};

export type TInputDateFieldProps = {
  classes?: TClasses;
  errors?: string | string[] | null;
  isDisabled?: boolean;
  isInvalid?: boolean;
  locale?: Locale;
  name?: string;
  maxDate?: Date | null;
  minDate?: Date | null;
  onChange: (value: Date | null) => void;
  onFieldClear?: (event: SyntheticEvent) => void;
  placeholder?: string;
  subTitle?: string;
  title?: string;
  value: Date | null;
};
