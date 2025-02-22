import type { ChangeEvent, ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";

export type TCheckboxProps = {
  checked?: boolean;
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  defaultChecked?: boolean;
  errors?: string | string[] | null;
  id: string;
  label?: string;
  name: string;
  nameGroup: string;
  onChange?: (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string,
  ) => void;
  theme?: ETheme;
};
