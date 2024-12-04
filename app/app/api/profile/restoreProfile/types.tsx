import type { z } from "zod";
import {restoreProfileParamsSchema, restoreProfileSchema} from "@/app/api/profile/restoreProfile/schemas";

export type TRestoreProfileParams = z.infer<typeof restoreProfileParamsSchema>;
export type TRestoreProfile = z.infer<typeof restoreProfileSchema>;
