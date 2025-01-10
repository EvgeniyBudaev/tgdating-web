"use client";

import clsx from "clsx";
import { memo, type ReactNode } from "react";
import type { FC, MouseEventHandler } from "react";
import { EColorText, EColorType } from "@/app/uikit/components/colors";
import { TColor } from "@/app/uikit/components/colors/types";
import { IconType, iconTypes } from "@/app/uikit/components/icon/iconType";
import "./Icon.scss";

const getIcon = (type: string): ((props: any) => JSX.Element) | undefined =>
  iconTypes.get(type);

type TProps = {
  className?: string;
  color?: TColor;
  dataTestId?: string;
  height?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  type: IconType;
  width?: number;
};

const IconComponent: FC<TProps> = ({
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
      className={clsx("Icon", className, mainStyles)}
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
