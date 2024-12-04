import { z } from "zod";

export const statusSchema = z.object({
  isBlocked: z.boolean(),
  isFrozen: z.boolean(),
  isInvisible: z.boolean(),
  isOnline: z.boolean(),
  isPremium: z.boolean(),
  isShowDistance: z.boolean(),
});