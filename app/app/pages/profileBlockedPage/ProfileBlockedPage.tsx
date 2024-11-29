"use client";

import {redirect} from "next/navigation";
import {type FC, useEffect} from "react";
import { useTranslation } from "@/app/i18n/client";
import {ELanguage, ERoutes} from "@/app/shared/enums";
import {createPath} from "@/app/shared/utils";
import "./ProfileBlockedPage.scss";

type TProps = {
  isBlocked?: boolean;
  lng: ELanguage;
  sessionId: string;
}

export const ProfileBlockedPage: FC<TProps> = ({isBlocked, lng}) => {
  const { t } = useTranslation("index");

  useEffect(() => {
    if (!isBlocked) {
      const path = createPath({
        route: ERoutes.Root,
        lng: lng,
      });
      redirect(path);
    }
  }, [isBlocked]);

  return (
    <div className="ProfileBlockedPage">
      <div className="ProfileBlockedPage-Inner">
        <div className="ProfileBlockedPage-Title">
          {t("common.titles.accountBlocked")}
        </div>
      </div>
    </div>
  );
};