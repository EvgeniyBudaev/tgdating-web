import { z } from "zod";

export const filterSchema = z.object({
  telegramUserId: z.string(),
  searchGender: z.string(),
  lookingFor: z.string(),
  ageFrom: z.number(),
  ageTo: z.number(),
  distance: z.number(),
  page: z.number(),
  size: z.number(),
});
