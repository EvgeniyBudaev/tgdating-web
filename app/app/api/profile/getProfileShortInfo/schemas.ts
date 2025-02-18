import { z } from "zod";
import { filterSchema } from "@/app/api/filter/schemas";
import { EMeasurement } from "@/app/shared/enums/form";

export const getProfileShortInfoParamsSchema = z.object({
  telegramUserId: z.string(),
  countryCode: z.string().nullish(),
  countryName: z.string().nullish(),
  city: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const profileShortInfoSchema = z.object({
  telegramUserId: z.string(),
  isBlocked: z.boolean(),
  isFrozen: z.boolean(),
  isPremium: z.boolean(),
  availableUntil: z.string(),
  languageCode: z.string(),
  measurement: z.enum([EMeasurement.Metric, EMeasurement.American]),
  filter: filterSchema.nullish(),
});
