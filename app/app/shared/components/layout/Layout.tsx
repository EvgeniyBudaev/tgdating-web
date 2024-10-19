"use client";

import { usePathname } from "next/navigation";
import { type FC, type ReactNode, useMemo } from "react";
import { Footer } from "@/app/shared/components/footer";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
  lng: ELanguage;
};

export const Layout: FC<TProps> = ({ children, lng }) => {
  const pathname = usePathname();

  const isFooter = useMemo(() => {
    const path = createPath({
      route: ERoutes.ProfileAdd,
      lng,
    });
    return pathname !== path;
  }, [pathname]);

  return (
    <div className="Layout">
      <div className="Layout-Content">{children}</div>
      {isFooter && <Footer lng={lng} />}
    </div>
  );
};
