import { z } from "zod";
import { likeSchema } from "@/app/api/like/add";

export const updateLikeParamsSchema = z.object({
  id: z.number(),
  isLiked: z.boolean(),
  sessionId: z.string(),
});
