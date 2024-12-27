"use client";

import isNil from "lodash/isNil";
import { useEffect, useState } from "react";

export const useDetectKeyboardOpen = (minKeyboardHeight = 300) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  // @ts-ignore
  const [formHeight, setFormHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window?.visualViewport !== "undefined" &&
      !isNil(window?.visualViewport?.height && !isNil(window?.screen.height))
    ) {
      const listener = () => {
        const newState =
          window?.screen.height - minKeyboardHeight >
          // @ts-ignore
          window?.visualViewport?.height;
        setFormHeight(window.innerHeight);
        if (isKeyboardOpen != newState) {
          setIsKeyboardOpen(newState);
        }
      };
      // @ts-ignore
      window?.visualViewport.addEventListener("resize", listener);
      return () => {
        // @ts-ignore
        window?.visualViewport.removeEventListener("resize", listener);
      };
    }
  }, [isKeyboardOpen, minKeyboardHeight]);

  return { isKeyboardOpen, formHeight };
};
