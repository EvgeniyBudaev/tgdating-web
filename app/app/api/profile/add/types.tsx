import type { z } from "zod";
import {
  addProfileParamsSchema,
  profileSchema,
} from "@/app/api/profile/add/schemas";

export type TAddProfile = z.infer<typeof profileSchema>;
export type TAddProfileParams = z.infer<typeof addProfileParamsSchema>;
