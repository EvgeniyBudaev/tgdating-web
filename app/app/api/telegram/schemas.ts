import { z } from "zod";

export const telegramSchema = z.object({
  telegramUserId: z.string(),
  username: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  languageCode: z.string(),
  allowsWriteToPm: z.boolean(),
  queryId: z.string(),
});
