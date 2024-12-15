"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { EToast } from "@/app/uikit/components/toast/enums";

type TProps = {
  className?: string;
  dataTestId?: string;
  description?: string;
  onClose?: () => void;
  title?: string;
  type?: EToast;
};

const ToastComponent: FC<TProps> = ({
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
