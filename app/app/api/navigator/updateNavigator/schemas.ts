import { z } from "zod";

export const updateNavigatorParamsSchema = z.object({
  telegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const navigatorSchema = z.object({
  telegramUserId: z.string(),
  location: locationSchema.nullish(),
});
