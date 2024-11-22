import { z } from "zod";

export const restoreProfileParamsSchema = z.object({
  sessionId: z.string(),
});

export const restoreProfileSchema = z.object({
  success: z.boolean(),
});
