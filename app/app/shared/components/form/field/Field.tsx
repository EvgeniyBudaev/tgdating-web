import clsx from "clsx";
import type { FC, ReactNode } from "react";
import "./Field.scss";

type TProps = {
  children: ReactNode;
  className?: string;
};

export const Field: FC<TProps> = ({ children, className }) => {
  return <div className={clsx("Field", className)}>{children}</div>;
};
