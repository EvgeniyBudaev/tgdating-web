"use client";

import { memo, useEffect, useState } from "react";
import type { FC } from "react";
import type { TFadeInProps } from "@/app/uikit/components/fadeIn/types";
import "./FadeIn.scss";

const FadeInComponent: FC<TFadeInProps> = ({
  children,
  dataTestId = "uikit__fade-in",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsMounted(true);
    }, 10);
    return () => clearTimeout(id);
  }, []);

  return (
    <span data-testid={dataTestId} date-fade={String(isMounted)}>
      {children}
    </span>
  );
};

FadeInComponent.displayName = "Fade";

export const FadeIn = memo(FadeInComponent);
