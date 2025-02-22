"use client";

import clsx from "clsx";
import dayjs from "dayjs";
import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { EGender } from "@/app/shared/enums";
import type { TOnlineProps } from "@/app/uikit/components/online/types";
import { Typography } from "@/app/uikit/components/typography";
import "./Online.scss";

const OnlineComponent: FC<TOnlineProps> = ({
  classes,
  gender,
  isOnlyCircle,
  lastOnline,
}) => {
  const { t } = useTranslation("index");
  const isMan = gender === EGender.Man;
  const now = dayjs();
  const lastOnlineDate = dayjs(lastOnline);

  const getLastOnlineMessage = (lastOnline: dayjs.Dayjs): string => {
    const diffInMinutes = now.diff(lastOnline, "minute");
    const isToday = now.isSame(lastOnline, "day");
    const isYesterday = now.subtract(1, "day").isSame(lastOnline, "day");
    const isWeek = now.isSame(lastOnline, "week");
    const isMonth = now.isSame(lastOnline, "month");

    switch (true) {
      case diffInMinutes <= 5:
        return t("common.status.online");
      case diffInMinutes <= 60:
        return isMan
          ? t("common.status.onlineJustBeenMan")
          : t("common.status.onlineJustBeenWoman");
      case isToday:
        return isMan
          ? t("common.status.onlineWasTodayMan")
          : t("common.status.onlineWasTodayWoman");
      case isYesterday:
        return isMan
          ? t("common.status.onlineWasYesterdayMan")
          : t("common.status.onlineWasYesterdayWoman");
      case isWeek:
        return isMan
          ? t("common.status.onlineWasWeekMan")
          : t("common.status.onlineWasWeekWoman");
      case isMonth:
        return isMan
          ? t("common.status.onlineWasMonthMan")
          : t("common.status.onlineWasMonthWoman");
      default:
        return isMan
          ? t("common.status.onlineLongTimeMan")
          : t("common.status.onlineLongTimeWoman");
    }
  };

  const checkIsOnline = (lastOnline: dayjs.Dayjs): boolean => {
    const diffInMinutes = now.diff(lastOnline, "minute");
    return diffInMinutes <= 5;
  };

  return (
    <div className={clsx(classes?.root, "Online")}>
      {isOnlyCircle && checkIsOnline(lastOnlineDate) && (
        <div
          className={clsx("Online-Circle", {
            ["Online-Circle__isOnline"]: checkIsOnline(lastOnlineDate),
          })}
        />
      )}
      {!isOnlyCircle && (
        <>
          <div
            className={clsx("Online-Circle", {
              ["Online-Circle__isOnline"]: checkIsOnline(lastOnlineDate),
            })}
          />
          <Typography>{getLastOnlineMessage(lastOnlineDate)}</Typography>
        </>
      )}
    </div>
  );
};

OnlineComponent.displayName = "Online";

export const Online = memo(OnlineComponent);
