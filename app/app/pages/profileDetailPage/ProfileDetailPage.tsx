"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import { redirect } from "next/navigation";
import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { ProfileSidebar } from "@/app/entities/profile/profileSidebar";
import { useTranslation } from "@/app/i18n/client";
import { Controls } from "@/app/pages/profileDetailPage/controls";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { Container } from "@/app/shared/components/container";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions, useTelegram } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Accordion } from "@/app/uikit/components/accordion";
import { Hamburger } from "@/app/uikit/components/hamburger";
import { Icon } from "@/app/uikit/components/icon";
import { Online } from "@/app/uikit/components/online";
import { Slider } from "@/app/uikit/components/slider";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
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
  const { isSession, user, theme } = useTelegram();
  const { t } = useTranslation("index");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isSessionUser = Boolean(
    profile?.telegramUserId && user?.id.toString() === profile.telegramUserId,
  );
  const isHiddenAge =
    !!profile?.status?.isHiddenAge && !!profile?.status?.isPremium;
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
          lng,
        }),
      );
    }
  }, [isSession, isExistUser]);

  const distance = useMemo(() => {
    return !isNil(profile?.navigator?.distance)
      ? getDistance(profile.navigator.distance, t)
      : undefined;
  }, [profile?.navigator, t]);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
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
            <Hamburger onClick={handleOpenSidebar} theme={theme} />
            <ProfileSidebar
              isSessionUser={isSessionUser}
              isSidebarOpen={isSidebarOpen}
              lng={lng}
              onCloseSidebar={handleCloseSidebar}
              profile={profile}
              ref={sidebarRef}
              telegramUserId={telegramUserId}
              theme={theme}
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
              {profile?.age && !isHiddenAge && (
                <Typography variant={ETypographyVariant.TextH4Medium}>
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
                    {!isSessionUser && distance && <span>,&nbsp;</span>}
                    <Typography>{profile?.location}&nbsp;</Typography>
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
          {!isSessionUser && !isAccordionOpen && (
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
