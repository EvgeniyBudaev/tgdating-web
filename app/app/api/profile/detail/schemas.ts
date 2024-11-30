import { z } from "zod";
import { imageSchema } from "@/app/api/profile/image";
import { telegramSchema } from "@/app/api/profile/telegram";

export const profileDetailParamsSchema = z.object({
  sessionId: z.string(),
  viewedSessionId: z.string(),
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
  sessionId: z.string(),
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
  navigator: z.object({
    distance: z.number().nullish(),
  }),
  telegram: telegramSchema.nullish(),
  block: blockSchema.nullish(),
  like: likeSchema.nullish(),
  images: imageSchema.array().nullish(),
});
