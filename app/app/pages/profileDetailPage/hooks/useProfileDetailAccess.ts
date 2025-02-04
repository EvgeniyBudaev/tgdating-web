"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import type { TProfileDetailPageProps } from "@/app/pages/profileDetailPage/types";
import { CITY, COUNTRY_CODE, COUNTRY_NAME } from "@/app/shared/constants";
import { useNavigatorContext, useShortInfoContext } from "@/app/shared/context";
import { ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
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
  const navigator = useNavigatorContext();
  const router = useRouter();
  const shortInfo = useShortInfoContext();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const countryCode = navigator?.countryCode ?? params.get(COUNTRY_CODE);
  const countryName = navigator?.countryName ?? params.get(COUNTRY_NAME);
  const city = navigator?.city ?? params.get(CITY);
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
    if (isFrozen) {
      const path = createPath({
        route:
          telegramUserId === viewedTelegramUserId
            ? ERoutes.ProfileFrozen
            : ERoutes.ProfileDeleted,
        params: { telegramUserId },
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isFrozen]);

  useEffect(() => {
    if (isSession && !isExistUser) {
      const path = createPath({
        route: ERoutes.Started,
        lng,
      });
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
        {
          ...(navigator?.latitude
            ? { latitude: navigator?.latitude.toString() }
            : {}),
          ...(navigator?.longitude
            ? { longitude: navigator?.longitude.toString() }
            : {}),
          ...(countryCode && { countryCode: countryCode }),
          ...(countryName && { countryName: countryName }),
          ...(city && { city: city }),
        },
      );
      router.push(path);
      router.refresh();
    }
  }, [lng, shortInfo, user]);
};
