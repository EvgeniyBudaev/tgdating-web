"use client";

import isNil from "lodash/isNil";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, memo, useEffect, useMemo, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { addLikeAction } from "@/app/actions/like/add/addLikeAction";
import { updateLikeAction } from "@/app/actions/like/update/updateLikeAction";
import type { TProfileDetail } from "@/app/api/profile/detail";
import { ProfileSidebar } from "@/app/entities/profile/profileSidebar";
import { useTranslation } from "@/app/i18n/client";
import { Block } from "@/app/pages/profileDetailPage/block";
import { Complaint } from "@/app/pages/profileDetailPage/complaint";
import {
  EAddLikeFormFields,
  ECancelLikeFormFields,
  EUpdateLikeFormFields,
} from "@/app/pages/profileDetailPage/enums";
import { getDistance } from "@/app/pages/profileDetailPage/utils";
import { Container } from "@/app/shared/components/container";
import { Field } from "@/app/shared/components/form/field";
import { INITIAL_FORM_STATE } from "@/app/shared/constants/form";
import { useTelegramContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { PROFILE_LOOKING_FOR_MAPPING } from "@/app/shared/mapping/profile";
import { createPath } from "@/app/shared/utils";
import { DATE_FORMAT } from "@/app/uikit/components/dateTime/constants";
import { useDayjs } from "@/app/uikit/components/dateTime/hooks";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Hamburger } from "@/app/uikit/components/hamburger";
import { Heart } from "@/app/uikit/components/heart";
import { Icon } from "@/app/uikit/components/icon";
import { Online } from "@/app/uikit/components/online";
import { Slider } from "@/app/uikit/components/slider";
import { Typography } from "@/app/uikit/components/typography";
import { getFullYear } from "@/app/uikit/utils/date";
import "./ProfileDetailPage.scss";

type TProps = {
  isExistUser: boolean;
  lng: ELanguage;
  profile?: TProfileDetail;
  viewedSessionId: string;
};

const ProfileDetailPageComponent: FC<TProps> = ({
  isExistUser,
  lng,
  profile,
  viewedSessionId,
}) => {
  const { dayjs } = useDayjs();
  const telegram = useTelegramContext();
  const isSession = telegram?.isSession;
  const user = telegram?.user;
  const { t } = useTranslation("index");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const fullYear = getFullYear(profile?.birthday);
  const isSessionUser = Boolean(
    profile?.sessionId && user?.id.toString() === profile.sessionId,
  );
  // const isLiked = !isSessionUser && profile?.like?.isLiked;
  const buttonSubmitRef = useRef<HTMLInputElement | null>(null);
  const [isShowTooltipHeart, setIsShowTooltipHeart] = useState(false);
  const isHeight = !isNil(profile?.height) && profile?.height !== 0;
  const isWeight = !isNil(profile?.weight) && profile?.weight !== 0;

  useEffect(() => {
    if (isSession && !isExistUser) {
      return redirect(
        createPath({
          route: ERoutes.ProfileAdd,
        }),
      );
    }
  }, [isSession, isExistUser]);

  // const canAddLike = useMemo(() => {
  //   return !isSessionUser && isNil(profile?.like?.id);
  // }, [isSessionUser, profile?.like?.id]);
  //
  // const canUpdateLike = useMemo(() => {
  //   return (
  //     !isSessionUser && !isNil(profile?.like?.id) && !profile?.like?.isLiked
  //   );
  // }, [isSessionUser, profile?.like?.id, profile?.like?.isLiked]);
  //
  // const canCancelLike = useMemo(() => {
  //   return (
  //     !isSessionUser && !isNil(profile?.like?.id) && profile?.like?.isLiked
  //   );
  // }, [isSessionUser, profile?.like?.id, profile?.like?.isLiked]);

  // const isCanClickHeart = useMemo(() => {
  //   if (isNil(profile?.like?.updatedAt)) {
  //     return true;
  //   }
  //   const lastClickDate = dayjs(profile?.like?.updatedAt)
  //     .utc()
  //     .format(DATE_FORMAT);
  //   const today = dayjs().utc().format(DATE_FORMAT);
  //   return canCancelLike || lastClickDate !== today;
  // }, [canCancelLike, dayjs, profile?.like?.updatedAt]);

  // const [state, formAction] = useFormState(
  //   canAddLike ? addLikeAction : updateLikeAction,
  //   INITIAL_FORM_STATE,
  // );

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

  const handleHeartClick = () => {
    // if (isCanClickHeart) {
    //   buttonSubmitRef.current && buttonSubmitRef.current.click();
    //   return;
    // }
    // setIsShowTooltipHeart(true);
  };

  const handleSubmit = (formData: FormData) => {
    // if (isSession && profile) {
    //   const formDataDto = new FormData();
    //   const keycloakSession = session as TSession;
    //   if (canAddLike) {
    //     formDataDto.append(
    //       EAddLikeFormFields.SessionId,
    //       keycloakSession?.user.id,
    //     );
    //     formDataDto.append(EAddLikeFormFields.LikedUserId, profile.id.toString());
    //     const message = t("common.actions.like");
    //     formDataDto.append(EAddLikeFormFields.Message, message);
    //     formDataDto.append(
    //       EAddLikeFormFields.Username,
    //       profile.telegram?.username ?? "",
    //     );
    //   }
    //   if (canCancelLike) {
    //     formDataDto.append(
    //       ECancelLikeFormFields.Id,
    //       (profile.like?.id ?? "").toString(),
    //     );
    //     formDataDto.append(ECancelLikeFormFields.IsCancel, "true");
    //     formDataDto.append(
    //       ECancelLikeFormFields.LikedUserId,
    //       profile.id.toString(),
    //     );
    //   }
    //   if (canUpdateLike) {
    //     formDataDto.append(
    //       EUpdateLikeFormFields.Id,
    //       (profile.like?.id ?? "").toString(),
    //     );
    //     formDataDto.append(EUpdateLikeFormFields.IsCancel, "false");
    //     formDataDto.append(
    //       EUpdateLikeFormFields.LikedUserId,
    //       profile.id.toString(),
    //     );
    //   }
    //   formAction(formDataDto);
    // }
  };

  return (
    profile &&
    profile?.sessionId &&
    isExistUser && (
      <>
        <DropDown>
          <DropDown.Button>
            <Hamburger />
          </DropDown.Button>
          <DropDown.Panel>
            <div className="DropDown-Menu">
              {!isSessionUser && (
                <Block blockedUserSessionId={profile.sessionId} lng={lng} />
              )}
              {!isSessionUser && (
                <Complaint criminalSessionId={profile.sessionId} lng={lng} />
              )}
              {isSessionUser && (
                <>
                  <Link
                    className="DropDown-MenuItem"
                    href={createPath({
                      route: ERoutes.ProfileEdit,
                      params: { sessionId: profile.sessionId },
                    })}
                    key={profile.sessionId}
                  >
                    <Typography>{t("common.actions.edit")}</Typography>
                  </Link>
                </>
              )}
            </div>
            <div className="DropDown-Menu">
              <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
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
            <Slider
              images={profile?.images}
              sessionId={profile?.sessionId ?? ""}
            />
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
                    {profile?.isOnline && (
                      <Field className="ProfileDetailPage-Online">
                        <Online
                          isOnline={profile?.isOnline}
                          message={
                            profile?.isOnline
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
                      <Heart
                        // isLiked={isLiked}
                        isLiked={false}
                        message={
                          isShowTooltipHeart
                            ? t("pages.profile.doubleLike")
                            : undefined
                        }
                        onClick={handleHeartClick}
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
        <form action={handleSubmit} className="ProfileDetailPage-Form">
          <input hidden={true} ref={buttonSubmitRef} type="submit" />
        </form>
      </>
    )
  );
};

ProfileDetailPageComponent.displayName = "ProfileDetailPage";

export const ProfileDetailPage = memo(ProfileDetailPageComponent);
