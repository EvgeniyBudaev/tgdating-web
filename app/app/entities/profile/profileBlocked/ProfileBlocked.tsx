"use client";

import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import "./ProfileBlocked.scss";

const ProfileBlockedComponent: FC = () => {
  const { t } = useTranslation("index");

  return (
    <div className="ProfileBlocked">
      <div className="ProfileBlocked-Title">
        {t("common.titles.accountBlocked")}
      </div>
    </div>
  );
};

ProfileBlockedComponent.displayName = "ProfileBlocked";

export const ProfileBlocked = memo(ProfileBlockedComponent);
