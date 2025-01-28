"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { TProfileFreezePageProps } from "@/app/pages/profileFreezePage/types";
import { ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

export const useProfileFreezeAccess = (props: TProfileFreezePageProps) => {
  const { isBlocked, isFrozen, lng, telegramUserId } = props;
  const router = useRouter();

  useEffect(() => {
    if (!isFrozen) {
      const path = createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId },
        lng: lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isFrozen]);

  useEffect(() => {
    if (isBlocked) {
      const path = createPath({
        route: ERoutes.ProfileBlocked,
        params: { telegramUserId },
        lng: lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isBlocked]);
};
