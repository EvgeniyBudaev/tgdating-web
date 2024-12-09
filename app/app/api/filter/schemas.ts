import { z } from "zod";

export const filterSchema = z.object({
  searchGender: z.string(),
  lookingFor: z.string(),
  ageFrom: z.number(),
  ageTo: z.number(),
  distance: z.number(),
  page: z.number(),
  size: z.number(),
});
