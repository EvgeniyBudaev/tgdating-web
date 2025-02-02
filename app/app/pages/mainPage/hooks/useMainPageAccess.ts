"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { TMainPageProps } from "@/app/pages/mainPage/types";
import { CITY, COUNTRY_CODE, COUNTRY_NAME } from "@/app/shared/constants";
import { useNavigator, useTelegram } from "@/app/shared/hooks";
import { useEffect } from "react";
import { createPath } from "@/app/shared/utils";
import { ERoutes } from "@/app/shared/enums";

export const useMainPageAccess = (props: TMainPageProps) => {
  const { lng } = props;
  const navigator = useNavigator({ lng });
  const router = useRouter();
  const { user } = useTelegram();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const countryCode = navigator?.countryCode ?? params.get(COUNTRY_CODE);
  const countryName = navigator?.countryName ?? params.get(COUNTRY_NAME);
  const city = navigator?.city ?? params.get(CITY);

  useEffect(() => {
    const telegramLanguageCode = user?.language_code;
    if (telegramLanguageCode && telegramLanguageCode !== lng) {
      const path = createPath(
        {
          route: ERoutes.Telegram,
          params: { telegramUserId: (user?.id ?? "").toString() },
          lng: telegramLanguageCode,
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
  }, [lng, user]);
};
