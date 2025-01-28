import type { TProfileList } from "@/app/api/profile/getProfileList/types";
import { ELanguage } from "@/app/shared/enums";

export type TSessionPageProps = {
  isExistUser: boolean;
  isManyRequest: boolean;
  isUnauthorized?: boolean;
  lng: ELanguage;
  profileList?: TProfileList;
  telegramUserId: string;
};
