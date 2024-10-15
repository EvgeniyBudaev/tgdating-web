import type { z } from "zod";
import {
  profileListParamsSchema,
  profileListSchema,
} from "@/app/api/profile/list/schemas";

export type TProfileList = z.infer<typeof profileListSchema>;
export type TProfileListParams = z.infer<typeof profileListParamsSchema>;
