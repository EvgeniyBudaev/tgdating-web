"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TLike } from "@/app/api/like/types";
import { checkLikeAction } from "@/app/actions/like/checkLike/checkLikeAction";
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
  const { t } = useTranslation("index");

  useEffect(() => {
    if (telegramUserId) {
      const intervalId = setInterval(async () => {
        const likeResponse = await checkLikeAction(telegramUserId);
        if (likeResponse.success && likeResponse.data) {
          const newLike = likeResponse.data;
          let isNewLike = false;
          const timeAgo = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes
          setLastLike((prev) => {
            if (
              newLike.createdAt !== prev?.createdAt &&
              newLike.createdAt < timeAgo
            )
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
