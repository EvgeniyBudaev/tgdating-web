import { memo } from "react";
import type { FC } from "react";
import { TIconProps } from "@/app/uikit/assets/icons/types";

const Component: FC<TIconProps> = ({
  dataTestId,
  height = 8,
  width = 16,
  ...props
}) => (
  <svg
    data-testid={dataTestId}
    fill="currentColor"
    height={height}
    width={width}
    viewBox="0 0 16 8"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M1.4303 0L0 1.21337L8 8L16 1.21337L14.5697 0L8 5.57326L1.4303 0Z" />
  </svg>
);

export const ArrowDownIcon = memo(Component);
