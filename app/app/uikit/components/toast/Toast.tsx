"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import type { TToastProps } from "@/app/uikit/components/toast/types";

const ToastComponent: FC<TToastProps> = ({
  className,
  dataTestId = "uikit__toast",
  description,
  title,
}) => {
  return (
    <div className={clsx("Toast", className)} data-testid={dataTestId}>
      <div className="Toast-Title">{title}</div>
      <div className="Toast-Description">{description}</div>
    </div>
  );
};

ToastComponent.displayName = "Toast";

export const Toast = memo(ToastComponent);
