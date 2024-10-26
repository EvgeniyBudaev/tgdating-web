"use client";

import { ReactNode, Suspense } from "react";
import { useMounted } from "@/app/shared/hooks";

export function SafeHydrate({ children }: { children: ReactNode }) {
  const isMounted = useMounted();

  return <Suspense key={isMounted ? "client" : "server"}>{children}</Suspense>;
}
