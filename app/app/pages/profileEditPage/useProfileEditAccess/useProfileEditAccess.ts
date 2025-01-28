"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import type { TProfileEditPageProps } from "@/app/pages/profileEditPage/types";
import { notification } from "@/app/uikit/utils";
import { createPath } from "@/app/shared/utils";
import { ERoutes } from "@/app/shared/enums";

export const useProfileEditAccess = (props: TProfileEditPageProps) => {
  const {
    isBlocked,
    isExistUser,
    isFrozen,
    isManyRequest,
    isUnauthorized,
    lng,
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
    if (isBlocked) {
      const path = createPath({
        route: ERoutes.ProfileBlocked,
        params: { telegramUserId },
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isBlocked]);

  useEffect(() => {
    if (!isExistUser) {
      const path = createPath({
        route: ERoutes.Started,
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isExistUser]);

  useEffect(() => {
    if (isFrozen) {
      const path = createPath({
        route: ERoutes.ProfileFrozen,
        params: { telegramUserId },
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isFrozen]);

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
