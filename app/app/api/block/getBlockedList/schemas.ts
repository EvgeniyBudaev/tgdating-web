import { z } from "zod";

export const getBlockedListParamsSchema = z.object({
  telegramUserId: z.string(),
});

export const getBlockedListSchema = z.object({
  content: z
    .object({
      blockedTelegramUserId: z.string(),
      url: z.string(),
    })
    .array()
    .nullish(),
});
