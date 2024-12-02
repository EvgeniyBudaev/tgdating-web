import { z } from "zod";

export const imageSchema = z.object({
  id: z.number(),
  telegramUserId: z.string(),
  name: z.string(),
  url: z.string(),
  size: z.number(),
  isBlocked: z.boolean(),
  isPrimary: z.boolean(),
  isPrivate: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
});
