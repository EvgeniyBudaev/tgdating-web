"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { TProfileFreezePageProps } from "@/app/pages/profileFreezePage/types";
import { ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";

export const useProfileFreezeAccess = (props: TProfileFreezePageProps) => {
  const { isFrozen, lng, telegramUserId } = props;
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
  }, [isFrozen, lng, telegramUserId, router]);
};
