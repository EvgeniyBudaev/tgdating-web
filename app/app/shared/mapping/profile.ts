import { ELookingFor } from "@/app/shared/enums/form";
import { ELanguage } from "@/app/shared/enums";

const CHAT_MAPPING = {
  [ELanguage.Ru]: "чат",
  [ELanguage.En]: "chat",
};

const DATES_MAPPING = {
  [ELanguage.Ru]: "свидания",
  [ELanguage.En]: "dates",
};

const RELATIONSHIP_MAPPING = {
  [ELanguage.Ru]: "отношения",
  [ELanguage.En]: "relationship",
};

const FRIENDSHIP_MAPPING = {
  [ELanguage.Ru]: "дружба",
  [ELanguage.En]: "friendship",
};

const BUSINESS_MAPPING = {
  [ELanguage.Ru]: "деловые связи",
  [ELanguage.En]: "business connections",
};

const SEX_MAPPING = {
  [ELanguage.Ru]: "секс",
  [ELanguage.En]: "sex",
};

const ALL_MAPPING = {
  [ELanguage.Ru]: "для всего",
  [ELanguage.En]: "for everything",
};

export const PROFILE_LOOKING_FOR_MAPPING = {
  [ELookingFor.Chat]: CHAT_MAPPING,
  [ELookingFor.Dates]: DATES_MAPPING,
  [ELookingFor.Relationship]: RELATIONSHIP_MAPPING,
  [ELookingFor.Friendship]: FRIENDSHIP_MAPPING,
  [ELookingFor.Business]: BUSINESS_MAPPING,
  [ELookingFor.Sex]: SEX_MAPPING,
  [ELookingFor.All]: ALL_MAPPING,
};
