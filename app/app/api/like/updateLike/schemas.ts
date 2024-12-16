import { z } from "zod";

export const updateLikeParamsSchema = z.object({
  id: z.number(),
  isLiked: z.boolean(),
  telegramUserId: z.string(),
});

export const updateLikeSchema = z.object({
  success: z.boolean(),
});
