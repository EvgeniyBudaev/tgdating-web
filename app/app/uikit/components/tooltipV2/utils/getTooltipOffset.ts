import type { TPlacement } from "../types";

type TGetTooltipOffsetParams = {
  placement?: TPlacement;
  referenceElement?: HTMLDivElement | null;
};

export const getTooltipOffset = ({ placement }: TGetTooltipOffsetParams) => {
  if (placement === "bottom" || placement === "top") {
    return [0, 0];
  } else {
    return [0, 0];
  }
};
