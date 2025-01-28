"use client";

import { memo, type FC } from "react";
import { ProfileForm } from "@/app/entities/profile/profileForm";
import type { TProfileEditPageProps } from "@/app/pages/profileEditPage/types";
import { ClientOnly } from "@/app/uikit/components/clientOnly";
import { useProfileEditAccess } from "@/app/pages/profileEditPage/useProfileEditAccess";

const ProfileEditPageComponent: FC<TProfileEditPageProps> = (props) => {
  const { lng, profile } = props;

  useProfileEditAccess(props);

  return (
    <ClientOnly>
      <ProfileForm isEdit={true} lng={lng} profile={profile} />
    </ClientOnly>
  );
};

ProfileEditPageComponent.displayName = "ProfileEditPage";

export const ProfileEditPage = memo(ProfileEditPageComponent);
