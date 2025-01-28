"use client";

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
  const router = useRouter();
  const { user } = useTelegram();

  useEffect(() => {
    if (user?.id) {
      const path = createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId: (user?.id ?? "").toString() },
        lng: lng,
      });
      router.push(path);
      router.refresh();
    }
  }, [lng, user?.id]);

  return <span></span>;
};

MainPageComponent.displayName = "MainPage";

export const MainPage = memo(MainPageComponent);
