import { z } from "zod";
import { imageSchema } from "@/app/api/image";
import { likeSchema } from "@/app/api/like/schemas";
import { statusSchema } from "@/app/api/status/schemas";

export const profileDetailParamsSchema = z.object({
  telegramUserId: z.string(),
  viewedTelegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

const blockSchema = z.object({
  isBlocked: z.boolean(),
});

export const profileDetailSchema = z.object({
  telegramUserId: z.string(),
  displayName: z.string(),
  age: z.number(),
  location: z.string().nullish(),
  description: z.string().nullish(),
  navigator: z
    .object({
      distance: z.number().nullish(),
    })
    .nullish(),
  status: statusSchema.nullish(),
  block: blockSchema.nullish(),
  like: likeSchema.nullish(),
  images: imageSchema.array().nullish(),
});
