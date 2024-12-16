import { z } from "zod";

export const addLikeParamsSchema = z.object({
  telegramUserId: z.string(),
  likedTelegramUserId: z.string(),
});

export const addLikeSchema = z.object({
  success: z.boolean(),
});