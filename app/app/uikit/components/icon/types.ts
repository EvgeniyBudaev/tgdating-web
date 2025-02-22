import type { TColor } from "@/app/uikit/components/colors/types";
import type { MouseEventHandler } from "react";
import type { IconType } from "@/app/uikit/components/icon/iconType";

export type TIconProps = {
  className?: string;
  color?: TColor;
  dataTestId?: string;
  height?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  type: IconType;
  width?: number;
};
