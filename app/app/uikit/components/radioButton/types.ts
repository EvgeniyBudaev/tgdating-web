import type { ETheme } from "@/app/uikit/enums/theme";
import type { ChangeEvent } from "react";

export type TRadioButtonProps = {
  checked?: boolean | undefined;
  label: string;
  name: string;
  onChange?: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined;
  theme?: ETheme;
  value?: string | readonly string[] | number | undefined;
};
