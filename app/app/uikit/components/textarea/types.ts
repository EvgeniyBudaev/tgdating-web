import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

type TClasses = {
  textarea?: string;
};

export interface ITextareaProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  autoComplete?: string;
  classes?: TClasses;
  className?: string;
  dataTestId?: string;
  defaultValue?: string;
  errors?: string | string[] | null;
  hidden?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
  isResize?: boolean;
  isRequired?: boolean;
  label?: string;
  name?: string;
  maxLength?: number;
  theme?: ETheme;
  type?: string;
  value?: string;
}
