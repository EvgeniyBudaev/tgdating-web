import { z } from "zod";
import { filterSchema } from "@/app/api/filter/schemas";
import { imageSchema } from "@/app/api/image";
import { navigatorSchema } from "@/app/api/navigator/updateNavigator/schemas";
import { settingsSchema } from "@/app/api/settings/schemas";
import { statusSchema } from "@/app/api/status/schemas";

export const getProfileParamsSchema = z.object({
  telegramUserId: z.string(),
  countryCode: z.string().nullish(),
  countryName: z.string().nullish(),
  city: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const getProfileSchema = z.object({
  telegramUserId: z.string(),
  displayName: z.string(),
  age: z.number(),
  gender: z.string(),
  description: z.string().nullish(),
  navigator: navigatorSchema.nullish(),
  filter: filterSchema.nullish(),
  status: statusSchema.nullish(),
  settings: settingsSchema.nullish(),
  images: imageSchema.array().nullish(),
});
