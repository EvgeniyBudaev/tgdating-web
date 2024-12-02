import { z } from "zod";

export const addLikeParamsSchema = z.object({
  telegramUserId: z.string(),
  likedTelegramUserId: z.string(),
});

export const likeSchema = z.object({
  id: z.number(),
  telegramUserId: z.string(),
  likedTelegramUserId: z.string(),
  isLiked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
});
