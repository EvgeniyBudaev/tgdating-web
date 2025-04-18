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
    fill="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M20 11H7.824l5.583-5.583-1.414-1.414L3.996 12l7.997 7.997 1.414-1.414L7.824 13H20z"
    ></path>
  </svg>
);

export const ArrowBackIcon = memo(Component);
