import type { FC } from "react";
import type {TProfile} from "@/app/api/profile/getProfile/types";
import { ProfileForm } from "@/app/entities/profile/profileForm";
import { ELanguage } from "@/app/shared/enums";

type TProps = {
  isManyRequest: boolean;
  lng: ELanguage;
  profile?: TProfile;
};

export const ProfileEditPage: FC<TProps> = ({ isManyRequest, lng, profile }) => {
  return <ProfileForm isEdit={true} isManyRequest={isManyRequest} lng={lng} profile={profile} />;
};
