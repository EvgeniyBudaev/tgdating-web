import type { z } from "zod";
import {
  getProfileListParamsSchema,
  profileListItemSchema,
  profileListSchema,
} from "@/app/api/profile/getProfileList/schemas";

export type TGetProfileListParams = z.infer<typeof getProfileListParamsSchema>;
export type TProfileList = z.infer<typeof profileListSchema>;

export type TProfileListItem = z.infer<typeof profileListItemSchema>;
