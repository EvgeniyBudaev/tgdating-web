"use client";

import { useState, type FC, memo, useCallback } from "react";
import { useTranslation } from "@/app/i18n/client";
import { SettingsSidebar } from "@/app/pages/profileDetailPage/settings/settingsSidebar";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { ELanguage } from "@/app/shared/enums";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Settings.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
  theme?: ETheme;
};

const SettingsComponent: FC<TProps> = ({ lng, telegramUserId, theme }) => {
  const { t } = useTranslation("index");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  return (
    <>
      <SidebarContentListItem onClick={handleOpenSidebar} theme={theme}>
        <Typography>{t("common.actions.settings")}</Typography>
      </SidebarContentListItem>
      <SettingsSidebar
        isOpen={isSidebarOpen}
        lng={lng}
        onCloseSidebar={handleCloseSidebar}
        theme={theme}
      />
    </>
  );
};

SettingsComponent.displayName = "Settings";

export const Settings = memo(SettingsComponent);
