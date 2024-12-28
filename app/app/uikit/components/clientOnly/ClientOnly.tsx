"use client";

import { type FC, type PropsWithChildren, useEffect, useState } from "react";
import "./ClientOnly.scss";

type TProps = {} & PropsWithChildren;

export const ClientOnly: FC<TProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div className="ClientOnly">{children}</div>;
};
