import { z } from "zod";

export const deleteProfileParamsSchema = z.object({
  sessionId: z.string(),
});

export const deleteProfileSchema = z.object({
  success: z.boolean(),
});
