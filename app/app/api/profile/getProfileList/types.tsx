import type { z } from "zod";
import {
  getProfileListParamsSchema,
  profileListSchema,
} from "@/app/api/profile/getProfileList/schemas";

export type TGetProfileListParams = z.infer<typeof getProfileListParamsSchema>;
export type TProfileList = z.infer<typeof profileListSchema>;
