import type { z } from "zod";
import {
  getProfileParamsSchema,
  getProfileSchema,
} from "@/app/api/profile/get/schemas";

export type TProfileParams = z.infer<typeof getProfileParamsSchema>;
export type TProfile = z.infer<typeof getProfileSchema>;
