import { z } from "zod";

export const addComplaintParamsSchema = z.object({
  telegramUserId: z.string(),
  criminalTelegramUserId: z.string(),
  reason: z.string(),
});

export const complaintSchema = z.object({
  success: z.boolean(),
});
