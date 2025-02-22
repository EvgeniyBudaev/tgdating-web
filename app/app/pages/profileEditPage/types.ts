import type { TProfile } from "@/app/api/profile/getProfile/types";
import { ELanguage } from "@/app/shared/enums";

export type TProfileEditPageProps = {
  isExistUser?: boolean;
  isFrozen?: boolean;
  isManyRequest: boolean;
  isUnauthorized?: boolean;
  lng: ELanguage;
  profile?: TProfile;
  telegramUserId: string;
};
