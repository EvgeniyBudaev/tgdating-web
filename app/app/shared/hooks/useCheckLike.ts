"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TLike } from "@/app/api/like/types";
import { checkLikeAction } from "@/app/actions/like/checkLike/checkLikeAction";
import { useDayjs } from "@/app/uikit/components/dateTime/hooks";
import { notification } from "@/app/uikit/utils";

type TProps = {
  telegramUserId?: string;
};

type TUseCheckLikeResponse = {
  isNewLike: boolean;
};

type TUseCheckLike = (props: TProps) => TUseCheckLikeResponse;

export const useCheckLike: TUseCheckLike = ({ telegramUserId }) => {
  const [lastLike, setLastLike] = useState<TLike | null>(null);
  const [isNewLike, setIsNewLike] = useState(false);
  const DURATION = 5000;
  const { dayjs } = useDayjs();
  const { t } = useTranslation("index");

  useEffect(() => {
    if (telegramUserId) {
      const intervalId = setInterval(async () => {
        const likeResponse = await checkLikeAction(telegramUserId);
        if (likeResponse.success && likeResponse.data) {
          const newLike = likeResponse.data;
          let isNewLike = false;
          const now = dayjs().utc();
          const likeCreatedAt = dayjs(newLike.createdAt).utc();
          const differenceTime = now.diff(likeCreatedAt, "second");

          setLastLike((prev) => {
            console.log("newLike.createdAt: ", newLike.createdAt);
            console.log("prev?.createdAt: ", prev?.createdAt);
            console.log(
              "newLike.createdAt !== prev?.createdAt: ",
              newLike.createdAt !== prev?.createdAt,
            );
            console.log("differenceTime: ", differenceTime);
            if (newLike.createdAt !== prev?.createdAt && differenceTime < 10)
              isNewLike = true;
            return newLike;
          });
          setIsNewLike(isNewLike);
        }
      }, DURATION);
      return () => clearInterval(intervalId);
    }
  }, [telegramUserId]);

  useEffect(() => {
    if (isNewLike) {
      console.log("isNewLike: ", isNewLike);
      notification({
        title: t("common.titles.isNewLike"),
        type: "success",
      });
    }
  });

  return {
    isNewLike,
  };
};
