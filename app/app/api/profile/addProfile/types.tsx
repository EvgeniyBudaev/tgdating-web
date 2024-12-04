import type { z } from "zod";
import {
  addProfileParamsSchema,
  profileSchema,
} from "@/app/api/profile/addProfile/schemas";

export type TAddProfileParams = z.infer<typeof addProfileParamsSchema>;
export type TAddProfile = z.infer<typeof profileSchema>;
