import { createContext } from "react";
import {ETheme} from "@/app/uikit/enums";

export type TTheme = {
  onChangeTheme: (theme: ETheme) => void;
  theme: ETheme;
};
export const ThemeContext = createContext<TTheme | null>(null);
export const ThemeProvider = ThemeContext.Provider;