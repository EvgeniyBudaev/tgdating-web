import { z } from "zod";

export const updateLikeParamsSchema = z.object({
  id: z.number(),
  isLiked: z.boolean(),
  sessionId: z.string(),
});
