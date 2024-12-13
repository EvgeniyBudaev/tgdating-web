import { z } from "zod";
import {filterSchema} from "@/app/api/filter/schemas";
import {imageSchema} from "@/app/api/image";
import {navigatorSchema} from "@/app/api/navigator/updateNavigator/schemas";
import {statusSchema} from "@/app/api/status/schemas";

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
  navigator: navigatorSchema.nullish(),
  filter: filterSchema.nullish(),
  status: statusSchema.nullish(),
  images: imageSchema.array().nullish(),
});
