import type { z } from "zod";
import {
  editProfileParamsSchema,
  editProfileSchema,
} from "@/app/api/profile/edit";

export type TEditProfileParams = z.infer<typeof editProfileParamsSchema>;
export type TEditProfile = z.infer<typeof editProfileSchema>;
