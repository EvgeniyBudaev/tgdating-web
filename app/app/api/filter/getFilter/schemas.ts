import { z } from "zod";

export const getFilterParamsSchema = z.object({
  telegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});
