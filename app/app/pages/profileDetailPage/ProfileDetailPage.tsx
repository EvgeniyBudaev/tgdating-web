"use client";

import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { ProfileSidebar } from "@/app/entities/profile/profileSidebar";
import { useTranslation } from "@/app/i18n/client";
import { Block } from "@/app/pages/profileDetailPage/block";
import { Complaint } from "@/app/pages/profileDetailPage/complaint";
import { Controls } from "@/app/pages/profileDetailPage/controls";
import { Delete } from "@/app/pages/profileDetailPage/delete/Delete";
import { Freeze } from "@/app/pages/profileDetailPage/freeze";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { Container } from "@/app/shared/components/container";
import { useTelegramContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions, useThemeContext } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Accordion } from "@/app/uikit/components/accordion";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Hamburger } from "@/app/uikit/components/hamburger";
import { Icon } from "@/app/uikit/components/icon";
import { Online } from "@/app/uikit/components/online";
import { Slider } from "@/app/uikit/components/slider";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums";
import { notification } from "@/app/uikit/utils";
import "./ProfileDetailPage.scss";

type TProps = {
  isExistUser: boolean;
  isManyRequest: boolean;
  lng: ELanguage;
  profile?: TProfileDetail;
  telegramUserId: string;
  viewedTelegramUserId: string;
};

const ProfileDetailPageComponent: FC<TProps> = ({
  isExistUser,
  isManyRequest,
  lng,
  profile,
  telegramUserId,
}) => {
  useCheckPermissions({ lng });
  const telegram = useTelegramContext();
  const themeState = useThemeContext();
  const theme = themeState?.theme;
  const isSession = telegram?.isSession;
  const user = telegram?.user;
  const { t } = useTranslation("index");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isSessionUser = Boolean(
    profile?.telegramUserId && user?.id.toString() === profile.telegramUserId,
  );
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    if (isManyRequest) {
      notification({
        title: t("errorBoundary.common.manyRequest"),
        type: "error",
      });
    }
  }, [isManyRequest]);

  useEffect(() => {
    if (isSession && !isExistUser) {
      return redirect(
        createPath({
          route: ERoutes.ProfileAdd,
        }),
      );
    }
  }, [isSession, isExistUser]);

  const distance = useMemo(() => {
    return profile?.navigator?.distance
      ? getDistance(profile.navigator.distance, t)
      : undefined;
  }, [profile?.navigator, t]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleDropDown = () => {
    setIsDropDownOpen((prev?: boolean) => !prev);
  };

  const handleCloseDropDown = () => {
    setIsDropDownOpen(false);
  };

  const handleToggleAccordion = () => {
    setIsAccordionOpen((prev?: boolean) => !prev);
  };

  return (
    profile &&
    profile?.telegramUserId &&
    isExistUser && (
      <>
        {!isAccordionOpen && (
          <>
            <DropDown isCanClickOutside={false} theme={theme}>
              <DropDown.Button onOpen={handleToggleDropDown}>
                <Hamburger theme={theme} />
              </DropDown.Button>
              <DropDown.Panel isOpen={isDropDownOpen}>
                <div className="DropDown-Menu">
                  {!isSessionUser && (
                    <Block
                      blockedTelegramUserId={profile.telegramUserId}
                      lng={lng}
                      onCloseDropDown={handleCloseDropDown}
                    />
                  )}
                  {!isSessionUser && (
                    <Complaint
                      criminalTelegramUserId={profile.telegramUserId}
                      lng={lng}
                      onCloseDropDown={handleCloseDropDown}
                    />
                  )}
                  {isSessionUser && (
                    <>
                      <Delete lng={lng} telegramUserId={telegramUserId} />
                      <Freeze lng={lng} telegramUserId={telegramUserId} />
                    </>
                  )}
                </div>
                <div className="DropDown-Menu">
                  {isSessionUser && (
                    <>
                      {/*<Settings lng={lng} telegramUserId={telegramUserId} />*/}
                      <Link
                        className="DropDown-MenuItem"
                        href={createPath({
                          route: ERoutes.ProfileEdit,
                          params: { telegramUserId: profile.telegramUserId },
                        })}
                        key={profile.telegramUserId}
                        onClick={handleCloseDropDown}
                      >
                        <Typography>
                          {t("common.actions.editProfile")}
                        </Typography>
                      </Link>
                    </>
                  )}
                  <div
                    className="DropDown-MenuItem DropDown-MenuItem-Cancel"
                    onClick={handleCloseDropDown}
                  >
                    <Typography>{t("common.actions.cancel")}</Typography>
                  </div>
                </div>
              </DropDown.Panel>
            </DropDown>
            <ProfileSidebar
              isSidebarOpen={isSidebarOpen}
              onCloseSidebar={handleCloseSidebar}
              profile={profile}
              ref={sidebarRef}
            />
          </>
        )}
        <div
          className={clsx("ProfileDetailPage", {
            ["theme-dark"]: theme === ETheme.Dark,
          })}
        >
          <div className="ProfileDetailPage-Slider">
            <Slider images={profile?.images} />
          </div>
          <Container>
            <div className="ProfileDetailPage-Field">
              <Typography variant={ETypographyVariant.TextH4Medium}>
                {profile?.displayName}
              </Typography>
              {profile?.age && (
                <Typography variant={ETypographyVariant.TextB2Regular}>
                  , {profile?.age}
                </Typography>
              )}
            </div>
            <div className="ProfileDetailPage-Field">
              {profile?.status?.isOnline && (
                <div className="ProfileDetailPage-Online">
                  <Online
                    isOnline={profile?.status?.isOnline}
                    message={
                      profile?.status?.isOnline
                        ? t("common.titles.online")
                        : undefined
                    }
                  />
                </div>
              )}
            </div>
            <div className="ProfileDetailPage-Field">
              <div className="ProfileDetailPage-Distansion">
                {!isSessionUser && distance && (
                  <Typography>{distance}</Typography>
                )}
                {profile?.location && (
                  <div className="ProfileDetailPage-Location">
                    {!isSessionUser && distance && <span>, </span>}
                    <Typography>{profile?.location}</Typography>
                    <Icon
                      className="ProfileDetailPage-Icon"
                      height={16}
                      width={16}
                      type="Location"
                    />
                  </div>
                )}
              </div>
            </div>
            {profile?.description && profile.description.length < 50 && (
              <div className="ProfileDetailPage-Description">
                <Typography>{profile.description}</Typography>
              </div>
            )}
          </Container>
          {profile?.description && profile.description.length > 50 && (
            <div className="ProfileDetailPage-Description">
              <Accordion
                isActive={isAccordionOpen}
                onToggle={handleToggleAccordion}
                title={profile.description}
              >
                <Typography>{profile.description}</Typography>
              </Accordion>
            </div>
          )}
          {!isAccordionOpen && (
            <Controls
              lng={lng}
              profile={profile}
              telegramUserId={telegramUserId}
            />
          )}
        </div>
      </>
    )
  );
};

ProfileDetailPageComponent.displayName = "ProfileDetailPage";

export const ProfileDetailPage = memo(ProfileDetailPageComponent);
