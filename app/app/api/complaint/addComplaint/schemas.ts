import { z } from "zod";
import { EComplaint } from "@/app/shared/enums/complaint";

export const addComplaintParamsSchema = z.object({
  telegramUserId: z.string(),
  criminalTelegramUserId: z.string(),
  type: z.nativeEnum(EComplaint),
  description: z.string(),
});

export const complaintSchema = z.object({
  success: z.boolean(),
});
