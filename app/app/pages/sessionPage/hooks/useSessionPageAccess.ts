"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { TProfileShortInfo } from "@/app/api/profile/getProfileShortInfo/types";
import { useTranslation } from "@/app/i18n/client";
import type { TSessionPageProps } from "@/app/pages/sessionPage/types";
import { CITY, COUNTRY_CODE, COUNTRY_NAME } from "@/app/shared/constants";
import { useNavigatorContext } from "@/app/shared/context";
import { ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
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
  const navigator = useNavigatorContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const countryCode = navigator?.countryCode ?? params.get(COUNTRY_CODE);
  const countryName = navigator?.countryName ?? params.get(COUNTRY_NAME);
  const city = navigator?.city ?? params.get(CITY);
  const { user } = useTelegram();
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
        route: ERoutes.ProfileFrozen,
        params: { telegramUserId },
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [lng, shortInfo, telegramUserId]);

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
          route: ERoutes.Telegram,
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
      console.log("path: ", path);
      router.push(path);
      router.refresh();
    }
  }, [lng, shortInfo, user]);
};
