import type { z } from "zod";
import {
  getProfileShortInfoParamsSchema,
  profileShortInfoSchema
} from "@/app/api/profile/getProfileShortInfo/schemas";


export type TGetProfileShortInfoParams = z.infer<
  typeof getProfileShortInfoParamsSchema
>;
export type TProfileShortInfo = z.infer<typeof profileShortInfoSchema>;
