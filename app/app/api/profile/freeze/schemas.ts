import { z } from "zod";

export const freezeProfileParamsSchema = z.object({
  sessionId: z.string(),
});

export const freezeProfileSchema = z.object({
  success: z.boolean(),
});
