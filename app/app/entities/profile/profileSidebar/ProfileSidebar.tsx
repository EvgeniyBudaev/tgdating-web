"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { type ForwardedRef, forwardRef, memo } from "react";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { useTranslation } from "@/app/i18n/client";
import { Block } from "@/app/pages/profileDetailPage/block";
import { Complaint } from "@/app/pages/profileDetailPage/complaint";
import { Delete } from "@/app/pages/profileDetailPage/delete";
import { Freeze } from "@/app/pages/profileDetailPage/freeze";
import { Settings } from "@/app/pages/profileDetailPage/settings";
import { SidebarContentControls } from "@/app/shared/components/sidebarContent/sidebarContentControls";
import { SidebarContentHeader } from "@/app/shared/components/sidebarContent/sidebarContentHeader";
import { SidebarContentList } from "@/app/shared/components/sidebarContent/sidebarContentList";
import { SidebarContentListItem } from "@/app/shared/components/sidebarContent/sidebarContentListItem";
import { useShortInfoContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { DateTime } from "@/app/uikit/components/dateTime";
import { Icon } from "@/app/uikit/components/icon";
import { Sidebar } from "@/app/uikit/components/sidebar";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
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
    const { query } = useNavigatorQuery();
    const shortInfo = useShortInfoContext();
    const { t } = useTranslation("index");
    const cancelButtonTitle = t("common.actions.cancel");
    const optionsTitle = t("common.titles.options");
    const router = useRouter();

    const handleRedirectBuyPremium = () => {
      const path = createPath(
        {
          route: ERoutes.BuyPremium,
          params: { telegramUserId: profile?.telegramUserId ?? "" },
          lng,
        },
        query,
      );
      onCloseSidebar?.();
      router.push(path);
      router.refresh();
    };

    const handleRedirectEditProfile = () => {
      const path = createPath(
        {
          route: ERoutes.ProfileEdit,
          params: { telegramUserId: profile?.telegramUserId ?? "" },
          lng,
        },
        query,
      );
      onCloseSidebar?.();
      router.push(path);
      router.refresh();
    };

    const handleRedirectHelp = () => {
      const url = "https://t.me/wefatehelp";
      window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleRedirectBlockedList = () => {
      const path = createPath(
        {
          route: ERoutes.BlockedList,
          params: { telegramUserId: profile?.telegramUserId ?? "" },
          lng,
        },
        query,
      );
      onCloseSidebar?.();
      router.push(path);
      router.refresh();
    };

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
            <SidebarContentHeader theme={theme} title={optionsTitle} />
            <SidebarContentList theme={theme}>
              {!isSessionUser && (
                <Block
                  blockedTelegramUserId={profile?.telegramUserId ?? ""}
                  lng={lng}
                  telegramUserId={telegramUserId}
                  theme={theme}
                />
              )}
              {!isSessionUser && (
                <Complaint
                  criminalTelegramUserId={profile?.telegramUserId ?? ""}
                  lng={lng}
                  telegramUserId={telegramUserId}
                  theme={theme}
                />
              )}
              {/*{isSessionUser && (*/}
              {/*  <Settings*/}
              {/*    lng={lng}*/}
              {/*    profile={profile}*/}
              {/*    telegramUserId={telegramUserId}*/}
              {/*    theme={theme}*/}
              {/*  />*/}
              {/*)}*/}
              {/*{isSessionUser && (*/}
              {/*  <SidebarContentListItem*/}
              {/*    onClick={handleRedirectBuyPremium}*/}
              {/*    theme={theme}*/}
              {/*  >*/}
              {/*    <div>*/}
              {/*      <div>*/}
              {/*        <Typography>{t("common.actions.buyPremium")}</Typography>*/}
              {/*      </div>*/}
              {/*      {shortInfo?.isPremium && (*/}
              {/*        <div className="ProfileSidebar-SubTitle">*/}
              {/*          <div>*/}
              {/*            <Typography>*/}
              {/*              Premium {t("common.titles.validityPeriod")}&nbsp;*/}
              {/*            </Typography>*/}
              {/*          </div>*/}
              {/*          <DateTime*/}
              {/*            className="ProfileSidebar-DateTime"*/}
              {/*            isUtc={false}*/}
              {/*            value={shortInfo?.availableUntil}*/}
              {/*          />*/}
              {/*        </div>*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*    <div className="ProfileSidebar-Icon-Premium">*/}
              {/*      <Icon type="Crown" />*/}
              {/*    </div>*/}
              {/*  </SidebarContentListItem>*/}
              {/*)}*/}
              {isSessionUser && (
                <SidebarContentListItem
                  onClick={handleRedirectBlockedList}
                  theme={theme}
                >
                  <Typography>{t("common.actions.blockedList")}</Typography>
                </SidebarContentListItem>
              )}
              {isSessionUser && (
                <SidebarContentListItem
                  onClick={handleRedirectEditProfile}
                  theme={theme}
                >
                  <Typography>{t("common.actions.editProfile")}</Typography>
                </SidebarContentListItem>
              )}
              {isSessionUser && (
                <SidebarContentListItem
                  onClick={handleRedirectHelp}
                  theme={theme}
                >
                  <Typography>{t("common.actions.help")}</Typography>
                </SidebarContentListItem>
              )}
              {isSessionUser && (
                <Freeze
                  lng={lng}
                  telegramUserId={telegramUserId}
                  theme={theme}
                />
              )}
              {isSessionUser && (
                <Delete
                  lng={lng}
                  telegramUserId={telegramUserId}
                  theme={theme}
                />
              )}
            </SidebarContentList>
            <SidebarContentControls
              onClick={onCloseSidebar}
              theme={theme}
              title={cancelButtonTitle}
            />
          </div>
        </Sidebar>
      </div>
    );
  },
);

ProfileSidebarComponent.displayName = "ProfileSidebar";

export const ProfileSidebar = memo(ProfileSidebarComponent);
