import { z } from "zod";

export const statusSchema = z.object({
  isBlocked: z.boolean(),
  isFrozen: z.boolean(),
  isHiddenAge: z.boolean(),
  isHiddenDistance: z.boolean(),
  isInvisible: z.boolean(),
  isLeftHand: z.boolean(),
  isOnline: z.boolean(),
  isPremium: z.boolean(),
});
