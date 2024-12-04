import { z } from "zod";
import {filterSchema} from "@/app/api/filter/schemas";
import {imageSchema} from "@/app/api/image";
import {navigatorSchema} from "@/app/api/navigator/updateNavigator/schemas";
import {statusSchema} from "@/app/api/status/schemas";
import {telegramSchema} from "@/app/api/telegram/schemas";

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
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
  lastOnline: z.string(),
  images: imageSchema.array().nullish(),
  navigator: navigatorSchema.nullish(),
  filter: filterSchema.nullish(),
  telegram: telegramSchema.nullish(),
  status: statusSchema.nullish(),
});
