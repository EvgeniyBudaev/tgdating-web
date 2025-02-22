"use client";

import clsx from "clsx";
import { memo, type FC } from "react";
import {
  DATE_FORMAT,
  TIME_FORMAT,
} from "@/app/uikit/components/dateTime/constants";
import { useDayjs } from "@/app/uikit/components/dateTime/hooks";
import type { TDateTimeProps } from "@/app/uikit/components/dateTime/types";
import { Typography } from "@/app/uikit/components/typography";
import "./DateTime.scss";

const DateTimeComponent: FC<TDateTimeProps> = ({
  className,
  classes,
  dateFormat,
  dataTestId = "uikit__date-time",
  isTime = true,
  isUtc = true,
  value,
}) => {
  const { dayjs } = useDayjs();

  return (
    <div className={clsx("DateTime", className)} data-testid={dataTestId}>
      <div className={clsx("DateTime-Date", classes?.date)}>
        <Typography>
          {isUtc
            ? dayjs(value)
                .utc()
                .format(dateFormat ?? DATE_FORMAT)
            : dayjs(value).format(dateFormat ?? DATE_FORMAT)}
        </Typography>
      </div>
      {isTime && (
        <div className={clsx("DateTime-Time", classes?.time)}>
          <Typography>
            {isUtc
              ? dayjs(value).utc().format(TIME_FORMAT)
              : dayjs(value).format(TIME_FORMAT)}
          </Typography>
        </div>
      )}
    </div>
  );
};

DateTimeComponent.displayName = "DateTime";

export const DateTime = memo(DateTimeComponent);
