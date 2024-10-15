"use client";

import { redirect } from "next/navigation";
import { type FC, useEffect } from "react";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import "./MainPage.scss";

type TProps = {
  lng: ELanguage;
};

export const MainPage: FC<TProps> = ({ lng }) => {
  const { user } = useTelegram();

  useEffect(() => {
    if (user?.id) {
      const path = createPath({
        route: ERoutes.Session,
        params: { sessionId: (user?.id ?? "").toString() },
        lng: lng,
      });
      redirect(path);
    }
  }, [user?.id]);

  return null;
};
