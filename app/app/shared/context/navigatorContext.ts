import { createContext, useContext } from "react";
import type { TUseNavigatorResponse } from "@/app/shared/hooks/useNavigator";

export const NavigatorContext = createContext<TUseNavigatorResponse | null>(
  null,
);
export const NavigatorProvider = NavigatorContext.Provider;

export const useNavigatorContext = (): TUseNavigatorResponse | null => {
  return useContext(NavigatorContext);
};
