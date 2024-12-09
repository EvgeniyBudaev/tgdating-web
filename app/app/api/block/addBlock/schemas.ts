import { z } from "zod";

export const addBlockParamsSchema = z.object({
  telegramUserId: z.string(),
  blockedTelegramUserId: z.string(),
});

export const blockSchema = z.object({
  success: z.boolean(),
});
