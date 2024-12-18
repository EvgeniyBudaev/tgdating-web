import { useContext, useMemo, useState } from "react";
import {type TTheme, ThemeContext} from "@/app/shared/context";
import {ETheme} from "@/app/uikit/enums";

export const useThemeContext = (): TTheme | null => {
  return useContext(ThemeContext);
};

type TProps = {
  defaultTheme: ETheme;
}

type TUseThemeResponse = {
  theme: ETheme;
  onChangeTheme: (theme: ETheme) => void;
}

type TUseTheme = (props: TProps) => TUseThemeResponse;

export const useTheme: TUseTheme = ({defaultTheme}) => {
  const [theme, setTheme] = useState(defaultTheme);

  const handleChangeTheme = (theme: ETheme) => {
    setTheme(theme);
  };

  return useMemo(() => {
    return {
      theme,
      onChangeTheme: handleChangeTheme,
    };
  }, [theme, setTheme]);
};