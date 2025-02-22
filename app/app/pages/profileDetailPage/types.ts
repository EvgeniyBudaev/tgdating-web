import type { TProfileDetail } from "@/app/api/profile/getProfileDetail/types";
import { ELanguage } from "@/app/shared/enums";

export type TProfileDetailPageProps = {
  isExistUser: boolean;
  isFrozen?: boolean;
  isManyRequest: boolean;
  isUnauthorized?: boolean;
  lng: ELanguage;
  profile?: TProfileDetail;
  telegramUserId: string;
  viewedTelegramUserId: string;
};
