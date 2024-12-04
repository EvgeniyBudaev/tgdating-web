import { z } from "zod";

export const freezeProfileParamsSchema = z.object({
  telegramUserId: z.string(),
});

export const freezeProfileSchema = z.object({
  success: z.boolean(),
});
