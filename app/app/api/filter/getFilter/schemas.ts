import { z } from "zod";

export const getFilterParamsSchema = z.object({
  telegramUserId: z.string(),
  countryCode: z.string().nullish(),
  countryName: z.string().nullish(),
  city: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});
