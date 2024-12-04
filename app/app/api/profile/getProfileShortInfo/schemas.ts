import { z } from "zod";

export const getProfileShortInfoParamsSchema = z.object({
  telegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const profileShortInfoSchema = z.object({
  telegramUserId: z.string(),
  imageUrl: z.string(),
  isFrozen: z.boolean(),
  isBlocked: z.boolean(),
});
