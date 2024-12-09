import { z } from "zod";

export const likeSchema = z.object({
  id: z.number(),
  isLiked: z.boolean(),
  updatedAt: z.string(),
});
