import { enUS, ru } from "date-fns/locale";
import { ELanguage } from "@/app/shared/enums";

const languageOptionsRU = [
  { label: "русский", value: ELanguage.Ru },
  { label: "английский", value: ELanguage.En },
];

const languageOptionsEN = [
  { label: "russian", value: ELanguage.En },
  { label: "english", value: ELanguage.En },
];

export const LANGUAGE_MAPPING = {
  [ELanguage.Ru]: languageOptionsRU,
  [ELanguage.En]: languageOptionsEN,
};

export const LOCALE_MAPPING = {
  [ELanguage.Ru]: ru,
  [ELanguage.En]: enUS,
};
