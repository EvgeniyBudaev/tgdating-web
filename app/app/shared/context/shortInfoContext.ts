import { createContext, useContext } from "react";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";

export const ShortInfoContext = createContext<TProfileShortInfo | null>(null);
export const ShortInfoProvider = ShortInfoContext.Provider;

export const useShortInfoContext = (): TProfileShortInfo | null => {
  return useContext(ShortInfoContext);
};
