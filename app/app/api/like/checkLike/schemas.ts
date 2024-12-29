import { z } from "zod";

export const checkLikeParamsSchema = z.object({
  telegramUserId: z.string(),
});
