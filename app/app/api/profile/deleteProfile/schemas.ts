import { z } from "zod";

export const deleteProfileParamsSchema = z.object({
  telegramUserId: z.string(),
});

export const deleteProfileSchema = z.object({
  success: z.boolean(),
});
