"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import { type FC, memo } from "react";
import type { TDistanceProps } from "@/app/uikit/components/distance/types";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Distance.scss";

const DistanceComponent: FC<TDistanceProps> = ({ distance, theme }) => {
  if (isNil(distance)) return null;

  return (
    <div
      className={clsx("Distance", {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      {distance}
    </div>
  );
};

DistanceComponent.displayName = "Distance";

export const Distance = memo(DistanceComponent);
