import type { z } from "zod";
import {
  checkProfileExistsParamsSchema,
  checkProfileExistsSchema,
} from "@/app/api/profile/checkProfile/schemas";

export type TCheckProfileExistsParams = z.infer<
  typeof checkProfileExistsParamsSchema
>;
export type TCheckProfileExists = z.infer<typeof checkProfileExistsSchema>;
