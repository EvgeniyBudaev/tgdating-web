import { ELanguage } from "@/app/shared/enums";

export type TMainPageProps = {
  isExistUser: boolean;
  isManyRequest: boolean;
  lng: ELanguage;
  telegramUserId: string;
};
