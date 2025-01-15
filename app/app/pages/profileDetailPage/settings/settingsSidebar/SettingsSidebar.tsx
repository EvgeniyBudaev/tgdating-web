import clsx from "clsx";
import { type FC, memo, useRef } from "react";
import { useTranslation } from "@/app/i18n/client";
import { SidebarContentControls } from "@/app/shared/components/sidebarContent/sidebarContentControls";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { SidebarContentList } from "@/app/shared/components/sidebarContent/sidebarContentList";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { useAuthenticityTokenContext } from "@/app/shared/context";
import { ELanguage } from "@/app/shared/enums";
import { useTelegram } from "@/app/shared/hooks";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SettingsSidebar.scss";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";

type TProps = {
  isOpen: boolean;
  lng: ELanguage;
  onCloseSidebar?: () => void;
  profile?: TProfileDetail;
  telegramUserId: string;
  theme?: ETheme;
};

const SettingsSidebarComponent: FC<TProps> = ({
  isOpen,
  lng,
  onCloseSidebar,
  profile,
  telegramUserId,
  theme,
}) => {
  const csrf = useAuthenticityTokenContext();
  const sidebarRef = useRef(null);
  const { initDataCrypt } = useTelegram();
  const { t } = useTranslation("index");

  const handleSubmit = () => {};

  return (
    <div className="SettingsSidebar">
      <Sidebar isActive={isOpen} ref={sidebarRef} theme={theme}>
        <div
          className={clsx("SettingsSidebar", {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
        >
          <form action={handleSubmit} className="SettingsSidebar-Form">
            <SidebarContentHeader
              theme={theme}
              title={t("common.actions.settings")}
            />
            <SidebarContentList
              className="SettingsSidebar-SidebarContentList"
              theme={theme}
            >
              <SidebarContentListItem
                className="SettingsSidebar-SidebarContentListItem"
                theme={theme}
              ></SidebarContentListItem>
            </SidebarContentList>
            <SidebarContentControls
              onCancel={onCloseSidebar}
              theme={theme}
              title={t("common.actions.apply")}
              typeButton="submit"
            />
          </form>
        </div>
      </Sidebar>
    </div>
  );
};

SettingsSidebarComponent.displayName = "SettingsSidebar";

export const SettingsSidebar = memo(SettingsSidebarComponent);
