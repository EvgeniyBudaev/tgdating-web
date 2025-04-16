"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { TRootPageProps } from "@/app/pages/rootPage/types";
import { ERoutes } from "@/app/shared/enums";
import { useNavigator, useStore, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";

export const useRootPageAccess = (props: TRootPageProps) => {
  const { lng } = props;
  const navigator = useNavigator({ lng });
  const router = useRouter();
  const [isLocationError, setIsLocationError] = useState(false);
  const updateNavigator = useStore((state) => state.updateNavigator);
  const { user } = useTelegram();
  const telegramLanguageCode = user?.language_code;
  const countryCode = navigator?.countryCode;
  const countryName = navigator?.countryName;
  const city = navigator?.city;

  const query = useMemo(() => {
    return {
      ...(navigator?.latitude
        ? { latitude: navigator?.latitude.toString() }
        : {}),
      ...(navigator?.longitude
        ? { longitude: navigator?.longitude.toString() }
        : {}),
      ...(countryCode && { countryCode: countryCode }),
      ...(countryName && { countryName: countryName }),
      ...(city && { city: city }),
    };
  }, [navigator, city, countryCode, countryName]);

  const isCoords = navigator?.latitude && navigator?.longitude;

  useEffect(() => {
    if (!isCoords) {
      const timer = setTimeout(() => {
        setIsLocationError(true);
      }, 10_000);

      return () => clearTimeout(timer);
    }
  }, [isCoords]);

  useEffect(() => {
    if (isCoords && !isLocationError && isCoords) {
      if (user?.id && telegramLanguageCode === lng) {
        updateNavigator(navigator);
        const path = createPath(
          {
            route: ERoutes.Main,
            params: { telegramUserId: (user?.id ?? "").toString() },
            lng: lng,
          },
          query,
        );
        router.push(path);
        router.refresh();
      }
      if (telegramLanguageCode && telegramLanguageCode !== lng) {
        updateNavigator(navigator);
        const path = createPath(
          {
            route: ERoutes.Main,
            params: { telegramUserId: (user?.id ?? "").toString() },
            lng: telegramLanguageCode,
          },
          query,
        );
        router.push(path);
        router.refresh();
      }
    }
  }, [
    lng,
    user,
    isCoords,
    navigator,
    telegramLanguageCode,
    query,
    isLocationError,
    router,
    updateNavigator,
  ]);

  return { isLocationError };
};
