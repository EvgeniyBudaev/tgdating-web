import { createContext, useContext } from "react";

type TPremiumContext = {
  isPremium: boolean;
  availableUntil: string;
};

export const PremiumContext = createContext<TPremiumContext | null>(null);
export const PremiumProvider = PremiumContext.Provider;

export const usePremiumContext = (): TPremiumContext | null => {
  return useContext(PremiumContext);
};
