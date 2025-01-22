import { z } from "zod";

export const unblockParamsSchema = z.object({
  telegramUserId: z.string(),
  blockedTelegramUserId: z.string(),
});

export const unblockSchema = z.object({
  success: z.boolean(),
});
