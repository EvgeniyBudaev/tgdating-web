import { z } from "zod";
import {imageSchema} from "@/app/api/image";
import {statusSchema} from "@/app/api/status/schemas";
import {telegramSchema} from "@/app/api/telegram/schemas";

export const profileDetailParamsSchema = z.object({
  telegramUserId: z.string(),
  viewedTelegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

const blockSchema = z.object({
  isBlocked: z.boolean(),
});

const likeSchema = z.object({
  id: z.number().nullish(),
  isLiked: z.boolean(),
  updatedAt: z.string().nullish(),
});

export const profileDetailSchema = z.object({
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
  navigator: z.object({
    distance: z.number().nullish(),
  }),
  telegram: telegramSchema.nullish(),
  status: statusSchema.nullish(),
  block: blockSchema.nullish(),
  like: likeSchema.nullish(),
  images: imageSchema.array().nullish(),
});
