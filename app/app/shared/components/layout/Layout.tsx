"use client";

import { type FC, type ReactNode } from "react";
import { Footer } from "@/app/shared/components/footer";
import { ELanguage } from "@/app/shared/enums";
import "./Layout.scss";

type TProps = {
  children?: ReactNode;
  lng: ELanguage;
};

export const Layout: FC<TProps> = ({ children, lng }) => {
  return (
    <div className="Layout">
      <div className="Layout-Content">{children}</div>
      <Footer lng={lng} />
    </div>
  );
};
