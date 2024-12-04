import type { z } from "zod";
import {deleteProfileParamsSchema, deleteProfileSchema} from "@/app/api/profile/deleteProfile/schemas";

export type TDeleteProfileParams = z.infer<typeof deleteProfileParamsSchema>;
export type TDeleteProfile = z.infer<typeof deleteProfileSchema>;
