"use client";

import { type FC, useEffect, useState } from "react";
import type { TClientOnlyProps } from "@/app/uikit/components/clientOnly/types";
import "./ClientOnly.scss";

export const ClientOnly: FC<TClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div className="ClientOnly">{children}</div>;
};
