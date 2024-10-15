import { z } from "zod";

export const profileShortInfoParamsSchema = z.object({
  sessionId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const profileShortInfoSchema = z.object({
  sessionId: z.string(),
  imageUrl: z.string(),
  isDeleted: z.boolean(),
  isBlocked: z.boolean(),
});
