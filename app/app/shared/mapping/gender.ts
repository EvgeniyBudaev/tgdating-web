import { EGender } from "@/app/shared/enums/form";
import { ELanguage } from "@/app/shared/enums";

const genderOptionsRU = [
  { label: "мужской", value: EGender.Man },
  { label: "женский", value: EGender.Woman },
];

const genderOptionsEN = [
  { label: "man", value: EGender.Man },
  { label: "woman", value: EGender.Woman },
];

export const GENDER_MAPPING = {
  [ELanguage.Ru]: genderOptionsRU,
  [ELanguage.En]: genderOptionsEN,
};
