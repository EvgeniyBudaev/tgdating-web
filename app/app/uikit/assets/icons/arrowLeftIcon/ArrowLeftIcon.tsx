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
    height={height}
    width={width}
    viewBox="0 0 8 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8 1.4303L6.78663 0L0 8L6.78663 16L8 14.5697L2.42674 8L8 1.4303Z" />
  </svg>
);

export const ArrowLeftIcon = memo(Component);
