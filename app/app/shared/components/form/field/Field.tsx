import clsx from "clsx";
import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./Field.scss";

type TProps = {
  children: ReactNode;
  className?: string;
};

const FieldComponent: FC<TProps> = ({ children, className }) => {
  return <div className={clsx("Field", className)}>{children}</div>;
};

FieldComponent.displayName = "Field";

export const Field = memo(FieldComponent);
