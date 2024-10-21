import clsx from "clsx";
import type { FC, ReactNode } from "react";
import "./Container.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
};

export const Container: FC<TProps> = ({ children, className }) => {
  return <div className={clsx("Container", className)}>{children}</div>;
};
