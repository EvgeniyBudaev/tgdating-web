"use client";

import isNil from "lodash/isNil";
import { useRef, useState, type FC, useMemo, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Header } from "@/app/shared/components/header";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { LANGUAGE_MAPPING } from "@/app/shared/mapping/language";
import { Icon } from "@/app/uikit/components/icon";
import { Select, type TSelectOption } from "@/app/uikit/components/select";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import "./Settings.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const SettingsComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const csrf = useAuthenticityTokenContext();
  const sidebarRef = useRef(null);
  const { initDataCrypt, isSession, user, theme } = useTelegram();
  const telegramLanguageCode = user?.language_code ?? lng;
  const { t } = useTranslation("index");
  const [isSidebarOpen, setIsSidebarOpen] = useState({
    isGeneralSettings: false,
    isChangeLanguage: false,
  });

  const languageDefault = useMemo(() => {
    return LANGUAGE_MAPPING[lng].find(
      (item) => item.value === telegramLanguageCode,
    );
  }, [lng, telegramLanguageCode]);

  const [languageState, setLanguageState] = useState<TSelectOption | undefined>(
    languageDefault,
  );

  const handleOpenSidebar = () => {
    setIsSidebarOpen({
      isGeneralSettings: true,
      isChangeLanguage: false,
    });
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen({
      isGeneralSettings: false,
      isChangeLanguage: false,
    });
  };

  const handleCloseSidebarSecondary = () => {
    setIsSidebarOpen({
      isGeneralSettings: true,
      isChangeLanguage: false,
    });
  };

  const handleChangeLanguage = (value?: TSelectOption) => {
    if (value) {
      value && setLanguageState(value);
      setIsSidebarOpen({
        isGeneralSettings: true,
        isChangeLanguage: false,
      });
    }
  };

  const handleBack = () => {
    handleCloseSidebar();
    // handleSubmit();
  };

  return (
    <>
      <div className="DropDown-MenuItem" onClick={handleOpenSidebar}>
        <Typography>{t("common.actions.settings")}</Typography>
      </div>
      <Sidebar
        isActive={isSidebarOpen.isGeneralSettings}
        onClose={handleBack}
        ref={sidebarRef}
      >
        <Header className="Settings-Header">
          <form action={handleBack}>
            <button className="Settings-Header-Save" type="submit">
              <Icon className="Settings-Header-Cancel" type="ArrowBack" />
            </button>
          </form>
          <Typography>{t("common.actions.settings")}</Typography>
          <div />
        </Header>
        <div className="Settings-List">
          <div className="Settings-List-Item">
            <Select
              isSidebarOpen={isSidebarOpen.isChangeLanguage}
              label={t("common.form.field.language")}
              headerTitle={!isNil(languageState) ? languageState?.label : "--"}
              onHeaderClick={() =>
                setIsSidebarOpen((prev) => ({
                  ...prev,
                  isChangeLanguage: true,
                }))
              }
            >
              <SidebarContent
                onSave={handleChangeLanguage}
                options={LANGUAGE_MAPPING[lng]}
                onCloseSidebar={handleCloseSidebarSecondary}
                selectedItem={languageState}
                title={t("common.form.field.language")}
              />
            </Select>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

SettingsComponent.displayName = "Settings";

export const Settings = memo(SettingsComponent);
