"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export const useScrollPosition = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    restoreScrollPosition();
    return () => saveScrollPosition();
  }, [pathname]);

  const saveScrollPosition = () => {
    sessionStorage.setItem(
      "tg_scrollPosition",
      document.body.scrollTop.toString(),
    );
  };

  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem("tg_scrollPosition");
    if (savedPosition) {
      document.body.scrollTo(0, parseInt(savedPosition));
    }
  };

  return {};
};
