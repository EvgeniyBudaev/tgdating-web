import { createContext, useContext } from "react";
import type { TUseTelegramResponse } from "@/app/shared/hooks/useTelegram";

export const TelegramContext = createContext<TUseTelegramResponse | null>(null);
export const TelegramProvider = TelegramContext.Provider;

export const useTelegramContext = (): TUseTelegramResponse | null => {
  return useContext(TelegramContext);
};
