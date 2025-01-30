import { z } from "zod";

export const updateNavigatorParamsSchema = z.object({
  telegramUserId: z.string(),
  countryCode: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export const navigatorSchema = z.object({
  location: locationSchema.nullish(),
});
