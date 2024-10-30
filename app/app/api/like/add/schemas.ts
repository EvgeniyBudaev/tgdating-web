import { z } from "zod";

export const addLikeParamsSchema = z.object({
  sessionId: z.string(),
  likedSessionId: z.string(),
});

export const likeSchema = z.object({
  id: z.number(),
  sessionId: z.string(),
  likedSessionId: z.string(),
  isLiked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
});
