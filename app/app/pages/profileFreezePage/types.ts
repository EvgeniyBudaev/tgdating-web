import { ELanguage } from "@/app/shared/enums";

export type TProfileFreezePageProps = {
  isBlocked?: boolean;
  isFrozen?: boolean;
  lng: ELanguage;
  telegramUserId: string;
};
