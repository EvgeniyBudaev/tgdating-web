"use client";

import { redirect } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import "./MainPage.scss";

type TProps = {
  lng: ELanguage;
};

const MainPageComponent: FC<TProps> = ({ lng }) => {
  const { user } = useTelegram();

  useEffect(() => {
    if (user?.id) {
      const path = createPath({
        route: ERoutes.Telegram,
        params: { telegramUserId: (user?.id ?? "").toString() },
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, user?.id]);

  return <span></span>;
};

MainPageComponent.displayName = "MainPage";

export const MainPage = memo(MainPageComponent);
