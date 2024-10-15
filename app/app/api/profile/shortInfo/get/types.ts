import type { z } from "zod";
import {
  profileShortInfoParamsSchema,
  profileShortInfoSchema,
} from "@/app/api/profile/shortInfo/get";

export type TProfileShortInfoParams = z.infer<
  typeof profileShortInfoParamsSchema
>;
export type TProfileShortInfo = z.infer<typeof profileShortInfoSchema>;
