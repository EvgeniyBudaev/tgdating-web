import { z } from "zod";

export const updateSettingsParamsSchema = z.object({
  telegramUserId: z.string(),
  isHiddenAge: z.boolean(),
});

export const updateSettingsSchema = z.object({
  success: z.boolean(),
});
