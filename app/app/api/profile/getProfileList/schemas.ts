import { z } from "zod";
import { paginationSchema } from "@/app/api/pagination/schemas";

export const getProfileListParamsSchema = z.object({
  telegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

const profileListItemSchema = z.object({
  telegramUserId: z.string(),
  distance: z.number().nullish(),
  url: z.string(),
  isOnline: z.boolean(),
  lastOnline: z.string(),
});

export const profileListSchema = paginationSchema.extend({
  content: profileListItemSchema.array(),
});
