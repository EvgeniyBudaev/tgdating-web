import { z } from "zod";

export const addBlockParamsSchema = z.object({
  sessionId: z.string(),
  blockedUserSessionId: z.string(),
});

export const blockSchema = z.object({
  id: z.number(),
  profileId: z.number(),
  blockedUserSessionId: z.string(),
  isBlocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
