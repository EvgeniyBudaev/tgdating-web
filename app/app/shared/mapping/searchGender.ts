import { ESearchGender } from "@/app/shared/enums/form";
import { ELanguage } from "@/app/shared/enums";

const searchGenderOptionsRU = [
  { label: "все", value: ESearchGender.All },
  { label: "парни", value: ESearchGender.Man },
  { label: "девушки", value: ESearchGender.Woman },
];

const searchGenderOptionsEN = [
  { label: "all", value: ESearchGender.All },
  { label: "boys", value: ESearchGender.Man },
  { label: "girls", value: ESearchGender.Woman },
];

export const SEARCH_GENDER_MAPPING = {
  [ELanguage.Ru]: searchGenderOptionsRU,
  [ELanguage.En]: searchGenderOptionsEN,
};

const searchBarSearchGenderOptionsRU = [
  { label: "Парни поблизости", value: ESearchGender.Man },
  { label: "Девушки поблизости", value: ESearchGender.Woman },
  { label: "Все люди поблизости", value: ESearchGender.All },
];

const searchBarSearchGenderOptionsEN = [
  { label: "Boys nearby", value: ESearchGender.Man },
  { label: "Girls nearby", value: ESearchGender.Woman },
  { label: "All the people nearby", value: ESearchGender.All },
];

export const SEARCH_BAR_SEARCH_GENDER_MAPPING = {
  [ELanguage.Ru]: searchBarSearchGenderOptionsRU,
  [ELanguage.En]: searchBarSearchGenderOptionsEN,
};
