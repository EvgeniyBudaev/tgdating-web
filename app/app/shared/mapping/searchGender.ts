import { ESearchGender } from "@/app/shared/enums/form";
import { ELanguage } from "@/app/shared/enums";

const searchGenderOptionsRU = [
  { label: "Все", value: ESearchGender.All },
  { label: "Парни", value: ESearchGender.Man },
  { label: "Девушки", value: ESearchGender.Woman },
];

const searchGenderOptionsEN = [
  { label: "All", value: ESearchGender.All },
  { label: "Boys", value: ESearchGender.Man },
  { label: "Girls", value: ESearchGender.Woman },
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
