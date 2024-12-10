"use client";

import isNil from "lodash/isNil";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { ProfileSidebar } from "@/app/entities/profile/profileSidebar";
import { useTranslation } from "@/app/i18n/client";
import { Block } from "@/app/pages/profileDetailPage/block";
import { Complaint } from "@/app/pages/profileDetailPage/complaint";
import { Delete } from "@/app/pages/profileDetailPage/delete/Delete";
import { Freeze } from "@/app/pages/profileDetailPage/freeze";
import { Like } from "@/app/pages/profileDetailPage/like";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { Container } from "@/app/shared/components/container";
import { Field } from "@/app/shared/components/form/field";
import { useTelegramContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useCheckPermissions } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Hamburger } from "@/app/uikit/components/hamburger";
import { Icon } from "@/app/uikit/components/icon";
import { Online } from "@/app/uikit/components/online";
import { Slider } from "@/app/uikit/components/slider";
import { Typography } from "@/app/uikit/components/typography";
import { notification } from "@/app/uikit/utils";
import { getFullYear } from "@/app/uikit/utils/date";
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
  const isSession = telegram?.isSession;
  const user = telegram?.user;
  const { t } = useTranslation("index");
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const fullYear = getFullYear(profile?.birthday);
  const isSessionUser = Boolean(
    profile?.telegramUserId && user?.id.toString() === profile.telegramUserId,
  );
  const isHeight = !isNil(profile?.height) && profile?.height !== 0;
  const isWeight = !isNil(profile?.weight) && profile?.weight !== 0;

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

  const handleOpenDropDown = () => {
    setIsDropDownOpen(true);
  };

  const handleCloseDropDown = () => {
    setIsDropDownOpen(false);
  };

  return (
    profile &&
    profile?.telegramUserId &&
    isExistUser && (
      <>
        <DropDown isCanClickOutside={false}>
          <DropDown.Button onOpen={handleOpenDropDown}>
            <Hamburger />
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
                    <Typography>{t("common.actions.editProfile")}</Typography>
                  </Link>
                  <Freeze lng={lng} telegramUserId={telegramUserId} />
                  <Delete lng={lng} telegramUserId={telegramUserId} />
                </>
              )}
            </div>
            <div className="DropDown-Menu">
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
        <div className="ProfileDetailPage">
          <div className="ProfileDetailPage-Slider">
            <Slider images={profile?.images} />
          </div>
          <Container>
            <div className="ProfileDetailPage-User">
              <div className="ProfileDetailPage-Box">
                <div className="ProfileDetailPage-Inner">
                  <div className="ProfileDetailPage-Inner-Left">
                    <Field>
                      <Typography>
                        {profile?.displayName}, {fullYear}
                      </Typography>
                    </Field>
                    {profile?.status?.isOnline && (
                      <Field className="ProfileDetailPage-Online">
                        <Online
                          isOnline={profile?.status?.isOnline}
                          message={
                            profile?.status?.isOnline
                              ? t("common.titles.online")
                              : undefined
                          }
                        />
                      </Field>
                    )}
                    {!isSessionUser && distance && (
                      <Field>
                        <Typography>{distance}</Typography>
                      </Field>
                    )}
                  </div>
                  <div className="ProfileDetailPage-Inner-Right">
                    {!isSessionUser && (
                      <Like
                        lng={lng}
                        profile={profile}
                        telegramUserId={telegramUserId}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {(profile?.location || isHeight || isWeight) && (
              <Field>
                <div className="ProfileDetailPage-Box">
                  {profile?.location && (
                    <Field>
                      <div className="ProfileDetailPage-Row">
                        <Icon
                          className="ProfileDetailPage-Icon"
                          type="Location"
                        />
                        <Typography>{profile?.location}</Typography>
                      </div>
                    </Field>
                  )}
                  {(isHeight || isWeight) && (
                    <Field>
                      <div className="ProfileDetailPage-Row">
                        <Icon
                          className="ProfileDetailPage-Icon"
                          type="Person"
                        />
                        {isHeight && (
                          <Typography>
                            {profile?.height} {t("common.reductions.cm")}&nbsp;
                          </Typography>
                        )}
                        {isWeight && (
                          <Typography>
                            {profile?.weight} {t("common.reductions.kg")}&nbsp;
                          </Typography>
                        )}
                      </div>
                    </Field>
                  )}
                </div>
              </Field>
            )}
            {profile?.description && (
              <Field>
                <div className="ProfileDetailPage-Box">
                  <div className="ProfileDetailPage-Inner">
                    <Typography>{profile?.description}</Typography>
                  </div>
                </div>
              </Field>
            )}
          </Container>
        </div>
      </>
    )
  );
};

ProfileDetailPageComponent.displayName = "ProfileDetailPage";

export const ProfileDetailPage = memo(ProfileDetailPageComponent);
