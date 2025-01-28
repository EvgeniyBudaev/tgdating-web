"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import type { TSessionPageProps } from "@/app/pages/sessionPage/types";
import { ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { notification } from "@/app/uikit/utils";

export const useSessionPageAccess = (props: TSessionPageProps) => {
  const {
    isExistUser,
    isManyRequest,
    isUnauthorized,
    lng,
    shortInfo,
    telegramUserId,
  } = props;
  const router = useRouter();
  const { t } = useTranslation("index");

  useEffect(() => {
    if (isManyRequest) {
      notification({
        title: t("errorBoundary.common.manyRequest"),
        type: "error",
      });
    }
  }, [isManyRequest]);

  useEffect(() => {
    if (shortInfo?.isBlocked) {
      const path = createPath({
        route: ERoutes.ProfileBlocked,
        params: { telegramUserId },
        lng,
      });
      router.push(path);
      router.refresh();
    }
    if (shortInfo?.isFrozen) {
      const path = createPath({
        route: ERoutes.ProfileDeleted,
        params: { telegramUserId },
        lng,
      });
      router.push(path);
      router.refresh();
    }
    if (!isExistUser) {
      const path = createPath({
        route: ERoutes.Started,
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isExistUser, lng, shortInfo, telegramUserId]);

  useEffect(() => {
    if (isUnauthorized) {
      const path = createPath({
        route: ERoutes.Unauthorized,
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isUnauthorized]);
};
