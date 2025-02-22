"use client";

import clsx from "clsx";
import { memo } from "react";
import type { FC } from "react";
import { EColorText, EColorType } from "@/app/uikit/components/colors";
import { iconTypes } from "@/app/uikit/components/icon/iconType";
import type { TIconProps } from "@/app/uikit/components/icon/types";
import "./Icon.scss";

const getIcon = (type: string): ((props: any) => JSX.Element) | undefined =>
  iconTypes.get(type);

const IconComponent: FC<TIconProps> = ({
  className,
  color = EColorText.Dark,
  dataTestId = "uikit__icon",
  height,
  onClick,
  type,
  width,
  ...rest
}) => {
  const mainStyles = clsx(`${EColorType.Icon}-${color}`);

  return (
    <div
      className={clsx(className, "Icon", mainStyles)}
      data-testid={dataTestId}
      onClick={onClick}
      {...rest}
    >
      {getIcon(type)?.({ height, width })}
    </div>
  );
};

IconComponent.displayName = "Icon";

export const Icon = memo(IconComponent);
