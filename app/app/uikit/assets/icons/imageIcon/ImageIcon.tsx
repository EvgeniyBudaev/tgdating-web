import { memo } from "react";
import type { FC } from "react";
import { TIconProps } from "@/app/uikit/assets/icons/types";

const Component: FC<TIconProps> = ({
  dataTestId,
  height = 24,
  width = 24,
  ...props
}) => (
  <svg
    data-testid={dataTestId}
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    viewBox="0 96 960 960"
    {...props}
  >
    <path d="M180 936q-24 0-42-18t-18-42V276q0-24 18-42t42-18h600q24 0 42 18t18 42v600q0 24-18 42t-42 18H180Zm0-60h600V276H180v600Zm56-97h489L578 583 446 754l-93-127-117 152Zm-56 97V276v600Z" />
  </svg>
);

export const ImageIcon = memo(Component);
