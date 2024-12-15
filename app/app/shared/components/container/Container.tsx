import clsx from "clsx";
import { memo } from "react";
import type { FC, ReactNode } from "react";
import "./Container.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
};

const ContainerComponent: FC<TProps> = ({ children, className }) => {
  return <div className={clsx("Container", className)}>{children}</div>;
};

ContainerComponent.displayName = "Container";

export const Container = memo(ContainerComponent);
