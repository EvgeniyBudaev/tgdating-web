"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { useTranslation } from "@/app/i18n/client";
import type { TSessionPageProps } from "@/app/pages/sessionPage/types";
import { ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { notification } from "@/app/uikit/utils";

export const useSessionPageAccess = (
  props: TSessionPageProps & { shortInfo: TProfileShortInfo | null },
) => {
  const {
    isExistUser,
    isManyRequest,
    isUnauthorized,
    lng,
    shortInfo,
    telegramUserId,
  } = props;
  const { query } = useNavigatorQuery();
  const router = useRouter();
  const { user } = useTelegram();
  const { t } = useTranslation("index");

  useEffect(() => {
    if (isManyRequest) {
      notification({
        title: t("errorBoundary.common.manyRequest"),
        type: "error",
      });
    }
  }, [isManyRequest, t]);

  useEffect(() => {
    if (shortInfo?.isFrozen) {
      const path = createPath(
        {
          route: ERoutes.ProfileFrozen,
          params: { telegramUserId },
          lng,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [lng, shortInfo, telegramUserId, query, router]);

  useEffect(() => {
    if (!isExistUser) {
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
  }, [isExistUser, lng, query, router]);

  useEffect(() => {
    if (isUnauthorized) {
      const path = createPath({
        route: ERoutes.Unauthorized,
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isUnauthorized, router, lng]);

  useEffect(() => {
    if (shortInfo && shortInfo?.languageCode !== lng) {
      const path = createPath(
        {
          route: ERoutes.Telegram,
          params: { telegramUserId: (user?.id ?? "").toString() },
          lng: shortInfo.languageCode,
        },
        query,
      );
      router.push(path);
      router.refresh();
    }
  }, [lng, shortInfo, user, query, router]);
};
