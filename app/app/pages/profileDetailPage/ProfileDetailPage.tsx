"use client";

import clsx from "clsx";
import { type FC, memo, useMemo, useRef, useState } from "react";
import { ProfileSidebar } from "@/app/entities/profile/profileSidebar";
import { useTranslation } from "@/app/i18n/client";
import { Controls } from "@/app/pages/profileDetailPage/controls";
import { useProfileDetailAccess } from "@/app/pages/profileDetailPage/hooks";
import type { TProfileDetailPageProps } from "@/app/pages/profileDetailPage/types";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { Container } from "@/app/shared/components/container";
import { Loader } from "@/app/shared/components/loader";
import { useShortInfoContext } from "@/app/shared/context";
import { useTelegram } from "@/app/shared/hooks";
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
import "./ProfileDetailPage.scss";

const ProfileDetailPageComponent: FC<TProfileDetailPageProps> = (props) => {
  const { isBlocked, isExistUser, isFrozen, lng, profile, telegramUserId } =
    props;
  const shortInfo = useShortInfoContext();
  const { user, theme } = useTelegram();
  const { t } = useTranslation("index");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const isSessionUser = Boolean(
    profile?.telegramUserId && user?.id.toString() === profile.telegramUserId,
  );
  const isHiddenAge =
    !!profile?.status?.isHiddenAge && !!profile?.status?.isPremium;
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useProfileDetailAccess(props);

  const distance = useMemo(() => {
    return getDistance({
      value: profile?.navigator?.distance,
      t,
      measurement: shortInfo?.measurement,
    });
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

  if (isBlocked || !isExistUser || isFrozen) return <Loader />;

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
                  ,&nbsp;{profile?.age}
                </Typography>
              )}
            </div>
            <div className="ProfileDetailPage-Field">
              <div className="ProfileDetailPage-Online">
                <Online
                  gender={profile.gender}
                  lastOnline={profile.lastOnline}
                />
              </div>
            </div>
            <div className="ProfileDetailPage-Field">
              <div className="ProfileDetailPage-Distansion">
                {!isSessionUser && distance && (
                  <Typography>{distance}</Typography>
                )}
                {distance && (
                  <div className="ProfileDetailPage-Location">
                    {!isSessionUser && distance && <span>,&nbsp;</span>}
                    {profile?.navigator?.countryName && (
                      <Typography>
                        {profile?.navigator?.countryName}
                        {profile?.navigator?.city && <span>,</span>}
                        &nbsp;
                      </Typography>
                    )}
                    {profile?.navigator?.city && (
                      <Typography>{profile?.navigator?.city}&nbsp;</Typography>
                    )}
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
