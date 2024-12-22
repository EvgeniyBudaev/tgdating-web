"use client";

import isNil from "lodash/isNil";
import { type FC, memo } from "react";
import "./Distance.scss";

type TProps = {
  distance?: string | number | null | undefined;
};

const DistanceComponent: FC<TProps> = ({ distance }) => {
  if (isNil(distance)) return null;

  return <div className="Distance">{distance}</div>;
};

export const Distance = memo(DistanceComponent);
