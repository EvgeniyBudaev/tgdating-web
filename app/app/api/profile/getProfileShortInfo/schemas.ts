import { z } from "zod";

export const getProfileShortInfoParamsSchema = z.object({
  telegramUserId: z.string(),
});

export const profileShortInfoSchema = z.object({
  telegramUserId: z.string(),
  isBlocked: z.boolean(),
  isFrozen: z.boolean(),
  isPremium: z.boolean(),
  availableUntil: z.string(),
  searchGender: z.string(),
  ageFrom: z.number(),
  ageTo: z.number(),
  distance: z.number(),
  page: z.number(),
  size: z.number(),
  languageCode: z.string(),
});
