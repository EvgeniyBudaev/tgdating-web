import { ETheme } from "@/app/uikit/enums/theme";

export type TCheckboxCustomProps = {
  checked?: boolean;
  dataTestId?: string;
  errors?: string | string[] | null;
  label?: string;
  name: string;
  onChange?: (value: boolean) => void;
  theme?: ETheme;
};
