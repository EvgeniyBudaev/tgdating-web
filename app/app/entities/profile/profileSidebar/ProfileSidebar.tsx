"use client";

import { type ForwardedRef, forwardRef, memo } from "react";
import type {TProfileDetail} from "@/app/api/profile/getProfileDetail/types";
import { useTranslation } from "@/app/i18n/client";
import { Header } from "@/app/shared/components/header";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import "./ProfileSidebar.scss";

type TProps = {
  isSidebarOpen: boolean;
  onCloseSidebar?: () => void;
  profile?: TProfileDetail;
};

const ProfileSidebarComponent = forwardRef(
  (
    { isSidebarOpen, onCloseSidebar, profile }: TProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const { t } = useTranslation("index");

    return (
      <div className="ProfileSidebar">
        <Sidebar isActive={isSidebarOpen} onClose={onCloseSidebar} ref={ref}>
          <Header className="SidebarContent-Header">
            <Icon
              className="SidebarContent-Header-Cancel"
              onClick={onCloseSidebar}
              type="ArrowBack"
            />
            <Typography>{t("common.actions.settings")}</Typography>
            <div />
          </Header>
        </Sidebar>
      </div>
    );
  },
);

ProfileSidebarComponent.displayName = "ProfileSidebar";

export const ProfileSidebar = memo(ProfileSidebarComponent);
