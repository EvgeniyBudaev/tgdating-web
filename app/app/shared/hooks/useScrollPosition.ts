"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export const useScrollPosition = () => {
  const pathname = usePathname();
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollTop > 0) {
        setHasScroll(true);
      } else {
        setHasScroll(false);
      }
    };
    document.body.addEventListener("scroll", handleScroll);
    return () => {
      document.body.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    restoreScrollPosition();
    //return () => saveScrollPosition();
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

  const getScrollPosition = () => {
    return sessionStorage.getItem("tg_scrollPosition");
  };

  const scrollUp = () => document.body.scrollTo(0, 0);

  return { saveScrollPosition, hasScroll, scrollUp };
};
