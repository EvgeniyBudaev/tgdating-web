"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { Typography } from "@/app/uikit/components/typography";
import "./Online.scss";

type TClasses = {
  root?: string;
};

type TProps = {
  classes?: TClasses;
  isOnline?: boolean;
  message?: string;
};

const OnlineComponent: FC<TProps> = ({ classes, isOnline, message }) => {
  if (!isOnline) return null;

  return (
    <div className={clsx(classes?.root, "Online")}>
      <div className="Online-Circle" />
      {message && (
        <div className="Online-Message">
          <Typography>{message}</Typography>
        </div>
      )}
    </div>
  );
};

OnlineComponent.displayName = "Online";

export const Online = memo(OnlineComponent);
