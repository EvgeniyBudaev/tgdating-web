import { z } from "zod";
import { paginationSchema } from "@/app/api/pagination/schemas";

const profileListItemSchema = z.object({
  sessionId: z.string(),
  distance: z.number(),
  url: z.string(),
  isOnline: z.boolean(),
  lastOnline: z.string(),
});

export const profileListParamsSchema = z.object({
  sessionId: z.string(),
  searchGender: z.string(),
  lookingFor: z.string(),
  ageFrom: z.string(),
  ageTo: z.string(),
  distance: z.string(),
  page: z.string(),
  size: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const profileListSchema = paginationSchema.extend({
  content: profileListItemSchema.array(),
});
