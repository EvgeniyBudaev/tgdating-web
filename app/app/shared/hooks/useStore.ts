"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { TUseNavigatorResponse } from "@/app/shared/hooks/useNavigator";

type TUseStore = {
  navigator: TUseNavigatorResponse | null;
  updateNavigator: (newNavigator: TUseNavigatorResponse) => void;
};

export const useStore = create<TUseStore>(
  // @ts-ignore
  persist(
    (set) => ({
      navigator: null,
      updateNavigator: (newNavigator) => set({ navigator: newNavigator }),
    }),
    {
      name: "wefate-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
