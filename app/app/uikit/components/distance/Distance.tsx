"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import { type FC, memo } from "react";
import { ETheme } from "@/app/uikit/enums";
import "./Distance.scss";

type TProps = {
  distance?: string | number | null | undefined;
  theme?: ETheme;
};

const DistanceComponent: FC<TProps> = ({ distance, theme }) => {
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

export const Distance = memo(DistanceComponent);
