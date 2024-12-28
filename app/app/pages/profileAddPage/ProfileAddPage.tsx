"use client";

import { memo, type FC } from "react";
import { ProfileForm } from "@/app/entities/profile/profileForm";
import { ELanguage } from "@/app/shared/enums";
import { ClientOnly } from "@/app/uikit/components/clientOnly";

type TProps = {
  lng: ELanguage;
};

const ProfileAddPageComponent: FC<TProps> = (props) => {
  return (
    <ClientOnly>
      <ProfileForm {...props} />
    </ClientOnly>
  );
};

ProfileAddPageComponent.displayName = "ProfileAddPage";

export const ProfileAddPage = memo(ProfileAddPageComponent);
