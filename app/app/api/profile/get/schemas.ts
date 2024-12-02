import { z } from "zod";
import { filterSchema } from "@/app/api/profile/filter";
import { imageSchema } from "@/app/api/profile/image";
import { navigatorSchema } from "@/app/api/profile/navigator";
import { telegramSchema } from "@/app/api/profile/telegram";

export const getProfileParamsSchema = z.object({
  telegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const getProfileSchema = z.object({
  telegramUserId: z.string(),
  displayName: z.string(),
  birthday: z.string(),
  gender: z.string(),
  location: z.string().nullish(),
  description: z.string().nullish(),
  height: z.number().nullish(),
  weight: z.number().nullish(),
  isFrozen: z.boolean(),
  isBlocked: z.boolean(),
  isPremium: z.boolean(),
  isShowDistance: z.boolean(),
  isInvisible: z.boolean(),
  isOnline: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
  lastOnline: z.string(),
  images: imageSchema.array().nullish(),
  navigator: navigatorSchema.nullish(),
  filter: filterSchema.nullish(),
  telegram: telegramSchema.nullish(),
});
