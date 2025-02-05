"use client";

import isEmpty from "lodash/isEmpty";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { TRootPageProps } from "@/app/pages/rootPage/types";
import { ERoutes } from "@/app/shared/enums";
import {
  useBrowser,
  useNavigator,
  useStore,
  useTelegram,
} from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";

export const useRootPageAccess = (props: TRootPageProps) => {
  const { lng } = props;
  const { isValidBrowser } = useBrowser();
  const navigator = useNavigator({ lng });
  const router = useRouter();
  const [isLocationError, setIsLocationError] = useState(false);
  const updateNavigator = useStore((state) => state.updateNavigator);
  const { user } = useTelegram();
  const telegramLanguageCode = user?.language_code;
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const countryCode = navigator?.countryCode;
  const countryName = navigator?.countryName;
  const city = navigator?.city;

  const query = {
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

  useEffect(() => {
    if (isEmpty(navigator)) {
      const timer = setTimeout(() => {
        setIsLocationError(true);
      }, 30_000);

      return () => clearTimeout(timer);
    }
  }, [navigator]);

  useEffect(() => {
    if (!isValidBrowser) {
      const path = createPath({
        route: ERoutes.Browser,
        lng,
      });
      router.push(path);
      router.refresh();
    }
    if (
      !isEmpty(query) &&
      !isLocationError &&
      isValidBrowser &&
      !isEmpty(navigator)
    ) {
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
  }, [lng, user, isValidBrowser, navigator, telegramLanguageCode, query]);

  return { isLocationError, navigator };
};
