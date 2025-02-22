import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

export interface IInputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  autoComplete?: string | undefined;
  className?: string | undefined;
  defaultValue?: string | number | undefined;
  dataTestId?: string | undefined;
  errors?: string | string[] | null | undefined;
  hidden?: boolean | undefined;
  isDisabled?: boolean | undefined;
  isFocused?: boolean | undefined;
  isHiddenViewing?: boolean | undefined;
  isNumeric?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  isRequired?: boolean | undefined;
  label?: string | undefined;
  maxLength?: number | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  subLabel?: string | undefined;
  theme?: ETheme | undefined;
  type?: string | undefined;
  value?: string | undefined;
}
