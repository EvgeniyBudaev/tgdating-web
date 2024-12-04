import type { z } from "zod";
import {
  profileDetailSchema,
  profileDetailParamsSchema,
} from "@/app/api/profile/getProfileDetail/schemas";

export type TProfileDetailParams = z.infer<typeof profileDetailParamsSchema>;
export type TProfileDetail = z.infer<typeof profileDetailSchema>;
