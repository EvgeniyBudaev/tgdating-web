"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import type { TProfileDetailPageProps } from "@/app/pages/profileDetailPage/types";
import { useShortInfoContext } from "@/app/shared/context";
import { ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { notification } from "@/app/uikit/utils";

export const useProfileDetailAccess = (props: TProfileDetailPageProps) => {
  const {
    isBlocked,
    isExistUser,
    isFrozen,
    isManyRequest,
    isUnauthorized,
    lng,
    telegramUserId,
    viewedTelegramUserId,
  } = props;
  const { query } = useNavigatorQuery();
  const router = useRouter();
  const shortInfo = useShortInfoContext();
  const { isSession, user } = useTelegram();
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
      const path = createPath(
        {
          route: ERoutes.ProfileBlocked,
          params: { telegramUserId },
          lng,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [isBlocked]);

  useEffect(() => {
    if (isFrozen) {
      const path = createPath(
        {
          route:
            telegramUserId === viewedTelegramUserId
              ? ERoutes.ProfileFrozen
              : ERoutes.ProfileDeleted,
          params: { telegramUserId },
          lng,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [isFrozen]);

  useEffect(() => {
    if (isSession && !isExistUser) {
      const path = createPath(
        {
          route: ERoutes.Started,
          lng,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [isSession, isExistUser]);

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

  useEffect(() => {
    if (shortInfo && shortInfo?.languageCode !== lng) {
      const path = createPath(
        {
          route: ERoutes.ProfileDetail,
          params: { telegramUserId: (user?.id ?? "").toString() },
          lng: shortInfo.languageCode,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [lng, shortInfo, user]);
};
