import clsx from "clsx";
import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./Header.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
};

const HeaderComponent: FC<TProps> = ({ children, className }) => {
  return <div className={clsx("Header", className)}>{children}</div>;
};

HeaderComponent.displayName = "Header";

export const Header = memo(HeaderComponent);
