"use client";

import { memo, type FC } from "react";
import { ProfileForm } from "@/app/entities/profile/profileForm";
import { ELanguage } from "@/app/shared/enums";

type TProps = {
  lng: ELanguage;
};

const ProfileAddPageComponent: FC<TProps> = (props) => {
  return <ProfileForm {...props} />;
};

ProfileAddPageComponent.displayName = "ProfileAddPage";

export const ProfileAddPage = memo(ProfileAddPageComponent);
