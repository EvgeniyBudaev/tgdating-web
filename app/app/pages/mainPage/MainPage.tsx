"use client";

import {redirect} from "next/navigation";
import {type FC, useEffect} from "react";
import {useTelegramContext} from "@/app/shared/context";
import {ELanguage, ERoutes} from "@/app/shared/enums";
import {useCheckPermissions} from "@/app/shared/hooks";
import {createPath} from "@/app/shared/utils";
import "./MainPage.scss";

type TProps = {
  lng: ELanguage;
};

export const MainPage: FC<TProps> = ({ lng }) => {
  useCheckPermissions({lng});
  const telegram = useTelegramContext();
  const user = telegram?.user;

  useEffect(() => {
    if (user?.id) {
      const path = createPath({
        route: ERoutes.Session,
        params: { sessionId: (user?.id ?? "").toString() },
        lng: lng,
      });
      redirect(path);
    }
  }, [lng, user?.id]);

  return <></>;
};
