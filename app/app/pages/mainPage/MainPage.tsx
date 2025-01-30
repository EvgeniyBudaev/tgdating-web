"use client";

import Bowser from "bowser";
import { useRouter } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import "./MainPage.scss";

type TProps = {
  lng: ELanguage;
};

const MainPageComponent: FC<TProps> = ({ lng }) => {
  let isValidBrowser = false;
  if (typeof window !== "undefined") {
    const browserParsed = Bowser.getParser(window.navigator.userAgent);
    isValidBrowser = browserParsed.getOSName().toLowerCase() !== "macos";
  }
  const router = useRouter();
  const { user } = useTelegram();

  useEffect(() => {
    if (!isValidBrowser) {
      const path = createPath({
        route: ERoutes.Browser,
        lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [isValidBrowser]);

  useEffect(() => {
    if (user?.id && isValidBrowser) {
      const path = createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId: (user?.id ?? "").toString() },
        lng: lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [lng, user?.id, isValidBrowser]);

  return <></>;
};

MainPageComponent.displayName = "MainPage";

export const MainPage = memo(MainPageComponent);
