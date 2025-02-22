"use client";

import { type FC, memo } from "react";
import type { THeartProps } from "@/app/uikit/components/heart/types";
import { Icon } from "@/app/uikit/components/icon";
import "./Heart.scss";

const HeartComponent: FC<THeartProps> = ({ isLiked }) => {
  return (
    <div className="Heart">
      <div className="Heart-Icon">
        {!isLiked && <Icon type="HeartEmpty" />}
        {isLiked && <Icon type="Heart" />}
      </div>
    </div>
  );
};

HeartComponent.displayName = "Heart";

export const Heart = memo(HeartComponent);
