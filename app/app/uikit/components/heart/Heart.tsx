"use client";

import { type FC, memo } from "react";
import { Icon } from "@/app/uikit/components/icon";
import "./Heart.scss";

type TProps = {
  isLiked: boolean;
};

const HeartComponent: FC<TProps> = ({ isLiked }) => {
  return (
    <div className="Heart">
      <div className="Heart-Icon">
        {!isLiked && <Icon type="HeartEmpty" />}
        {isLiked && <Icon type="Heart" />}
      </div>
    </div>
  );
};

export const Heart = memo(HeartComponent);
