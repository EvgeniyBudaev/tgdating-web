import type { z } from "zod";
import {editProfileParamsSchema, editProfileSchema} from "@/app/api/profile/editProfile/schemas";

export type TEditProfileParams = z.infer<typeof editProfileParamsSchema>;
export type TEditProfile = z.infer<typeof editProfileSchema>;
