import { useTelegramContext } from "@/app/shared/context";
import { ETheme } from "@/app/uikit/enums";

type TUseTheme = () => {
  theme: ETheme;
};

export const useTheme: TUseTheme = () => {
  const telegram = useTelegramContext();
  const theme = telegram?.theme ?? ETheme.Light;

  return { theme };
};
