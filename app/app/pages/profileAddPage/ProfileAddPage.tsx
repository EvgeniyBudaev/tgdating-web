"use client";

import type { FC } from "react";
import { ProfileForm } from "@/app/entities/profile/profileForm";
import { ELanguage } from "@/app/shared/enums";

type TProps = {
  lng: ELanguage;
};

export const ProfileAddPage: FC<TProps> = (props) => {
  return <ProfileForm {...props} />;
};
