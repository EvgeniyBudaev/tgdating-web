"use client";

import { memo, type FC } from "react";
import { ProfileForm } from "@/app/entities/profile/profileForm";
import type { TProfileEditPageProps } from "@/app/pages/profileEditPage/types";
import { ClientOnly } from "@/app/uikit/components/clientOnly";
import { useProfileEditAccess } from "@/app/pages/profileEditPage/useProfileEditAccess";
import { Loader } from "@/app/shared/components/loader";

const ProfileEditPageComponent: FC<TProfileEditPageProps> = (props) => {
  const { isBlocked, isExistUser, isFrozen, isUnauthorized, lng, profile } =
    props;

  useProfileEditAccess(props);

  if (isBlocked || !isExistUser || isFrozen || isUnauthorized)
    return <Loader />;

  return (
    <ClientOnly>
      <ProfileForm isEdit={true} lng={lng} profile={profile} />
    </ClientOnly>
  );
};

ProfileEditPageComponent.displayName = "ProfileEditPage";

export const ProfileEditPage = memo(ProfileEditPageComponent);
