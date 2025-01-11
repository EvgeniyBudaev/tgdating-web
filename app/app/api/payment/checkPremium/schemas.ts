import { z } from "zod";

export const checkPremiumParamsSchema = z.object({
  telegramUserId: z.string(),
});

export const checkPremiumSchema = z.object({
  isPremium: z.boolean(),
});
