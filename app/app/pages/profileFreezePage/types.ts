import { ELanguage } from "@/app/shared/enums";

export type TProfileFreezePageProps = {
  isFrozen?: boolean;
  lng: ELanguage;
  telegramUserId: string;
};
