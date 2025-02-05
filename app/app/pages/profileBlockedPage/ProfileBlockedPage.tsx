"use client";

import { useRouter } from "next/navigation";
import { type FC, memo, useEffect } from "react";
import { useTranslation } from "@/app/i18n/client";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import "./ProfileBlockedPage.scss";

type TProps = {
  isBlocked?: boolean;
  lng: ELanguage;
};

const ProfileBlockedPageComponent: FC<TProps> = ({ isBlocked, lng }) => {
  const { query } = useNavigatorQuery();
  const router = useRouter();
  const { t } = useTranslation("index");
  const { user } = useTelegram();

  useEffect(() => {
    if (!isBlocked) {
      const path = createPath(
        {
          route: ERoutes.Telegram,
          params: { telegramUserId: (user?.id ?? "").toString() },
          lng: lng,
        },
        query,
      );
      router.push(path);
      router.refresh();
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

ProfileBlockedPageComponent.displayName = "ProfileBlockedPage";

export const ProfileBlockedPage = memo(ProfileBlockedPageComponent);
