"use client";

import clsx from "clsx";
import Link from "next/link";
import { type ForwardedRef, forwardRef, memo } from "react";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { useTranslation } from "@/app/i18n/client";
import { Block } from "@/app/pages/profileDetailPage/block";
import { Delete } from "@/app/pages/profileDetailPage/delete";
import { Freeze } from "@/app/pages/profileDetailPage/freeze";
import { Premium } from "@/app/pages/profileDetailPage/premium";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { SidebarContentList } from "@/app/shared/components/sidebarContent/sidebarContentList";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { createPath } from "@/app/shared/utils";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { ETheme } from "@/app/uikit/enums/theme";
import { Typography } from "@/app/uikit/components/typography";
import "./ProfileSidebar.scss";

type TProps = {
  isSessionUser: boolean;
  isSidebarOpen: boolean;
  lng: ELanguage;
  onCloseSidebar?: () => void;
  profile?: TProfileDetail;
  telegramUserId: string;
  theme?: ETheme;
};

const ProfileSidebarComponent = forwardRef(
  (
    {
      isSessionUser,
      isSidebarOpen,
      lng,
      onCloseSidebar,
      profile,
      telegramUserId,
      theme,
    }: TProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const { t } = useTranslation("index");
    const cancelButtonTitle = t("common.actions.cancel");
    const optionsTitle = t("common.titles.options");

    return (
      <div className="ProfileSidebar">
        <Sidebar
          isActive={isSidebarOpen}
          onClose={onCloseSidebar}
          ref={ref}
          theme={theme}
        >
          <div
            className={clsx("SidebarContent", {
              ["theme-dark"]: theme === ETheme.Dark,
            })}
          >
            <SidebarContentHeader
              cancelButtonTitle={cancelButtonTitle}
              onClick={onCloseSidebar}
              theme={theme}
              title={optionsTitle}
            />
            <SidebarContentList theme={theme}>
              {!isSessionUser && (
                <SidebarContentListItem theme={theme}>
                  <Block
                    blockedTelegramUserId={profile?.telegramUserId ?? ""}
                    lng={lng}
                    onCloseDropDown={onCloseSidebar}
                    telegramUserId={telegramUserId}
                  />
                </SidebarContentListItem>
              )}
              {isSessionUser && (
                <SidebarContentListItem theme={theme}>
                  <Premium telegramUserId={telegramUserId} />
                </SidebarContentListItem>
              )}
              {isSessionUser && (
                <SidebarContentListItem theme={theme}>
                  <Link
                    href={createPath({
                      route: ERoutes.ProfileEdit,
                      params: { telegramUserId: profile?.telegramUserId ?? "" },
                    })}
                    onClick={onCloseSidebar}
                  >
                    <Typography>{t("common.actions.editProfile")}</Typography>
                  </Link>
                </SidebarContentListItem>
              )}
              {isSessionUser && (
                <SidebarContentListItem theme={theme}>
                  <Freeze lng={lng} telegramUserId={telegramUserId} />
                </SidebarContentListItem>
              )}
              {isSessionUser && (
                <SidebarContentListItem theme={theme}>
                  <Delete lng={lng} telegramUserId={telegramUserId} />
                </SidebarContentListItem>
              )}
            </SidebarContentList>
          </div>
        </Sidebar>
      </div>
    );
  },
);

ProfileSidebarComponent.displayName = "ProfileSidebar";

export const ProfileSidebar = memo(ProfileSidebarComponent);
