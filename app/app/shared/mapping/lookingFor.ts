import { ELookingFor } from "@/app/shared/enums/form";
import { ELanguage } from "@/app/shared/enums";

const lookingForOptionsRU = [
  { label: "общение", value: ELookingFor.Chat },
  { label: "свидания", value: ELookingFor.Dates },
  { label: "отношения", value: ELookingFor.Relationship },
  { label: "дружба", value: ELookingFor.Friendship },
  { label: "деловые связи", value: ELookingFor.Business },
  { label: "секс", value: ELookingFor.Sex },
  { label: "для всего", value: ELookingFor.All },
];

const lookingForOptionsEN = [
  { label: "communication", value: ELookingFor.Chat },
  { label: "dates", value: ELookingFor.Dates },
  { label: "relationship", value: ELookingFor.Relationship },
  { label: "friendship", value: ELookingFor.Friendship },
  { label: "business", value: ELookingFor.Business },
  { label: "sex", value: ELookingFor.Sex },
  { label: "for everything", value: ELookingFor.All },
];

export const LOOKING_FOR_MAPPING = {
  [ELanguage.Ru]: lookingForOptionsRU,
  [ELanguage.En]: lookingForOptionsEN,
};
