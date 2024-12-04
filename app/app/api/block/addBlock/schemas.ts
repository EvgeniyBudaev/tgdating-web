import { z } from "zod";

export const addBlockParamsSchema = z.object({
  telegramUserId: z.string(),
  blockedTelegramUserId: z.string(),
});

export const blockSchema = z.object({
  id: z.number(),
  telegramUserId: z.number(),
  blockedTelegramUserId: z.string(),
  isBlocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
