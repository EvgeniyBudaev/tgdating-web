import { z } from "zod";
import { paginationSchema } from "@/app/api/pagination/schemas";

export const getProfileListParamsSchema = z.object({
  telegramUserId: z.string(),
  countryCode: z.string().nullish(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const profileListItemSchema = z.object({
  telegramUserId: z.string(),
  distance: z.number().nullish(),
  url: z.string(),
  isOnline: z.boolean(),
  isLiked: z.boolean(),
  lastOnline: z.string(),
});

export const profileListSchema = paginationSchema.extend({
  content: profileListItemSchema.array(),
});
