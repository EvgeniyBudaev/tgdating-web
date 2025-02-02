"use client";

import { useRouter } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import type { TMainPageProps } from "@/app/pages/mainPage/types";
import { ERoutes } from "@/app/shared/enums";
import { useBrowser, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import "./MainPage.scss";

const MainPageComponent: FC<TMainPageProps> = (props) => {
  const { lng } = props;
  const { isValidBrowser } = useBrowser();
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
    if (user?.id && isValidBrowser) {
      const path = createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId: (user?.id ?? "").toString() },
        lng: lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [lng, user, isValidBrowser]);

  return <></>;
};

MainPageComponent.displayName = "MainPage";

export const MainPage = memo(MainPageComponent);
