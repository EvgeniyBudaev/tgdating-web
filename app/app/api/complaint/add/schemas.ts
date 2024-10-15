import { z } from "zod";

export const addComplaintParamsSchema = z.object({
  sessionId: z.string(),
  criminalSessionId: z.string(),
  reason: z.string().nullish(),
});

export const complaintSchema = z.object({
  id: z.number(),
  sessionId: z.string(),
  criminalSessionId: z.string(),
  reason: z.string().nullish(),
  isDeleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
