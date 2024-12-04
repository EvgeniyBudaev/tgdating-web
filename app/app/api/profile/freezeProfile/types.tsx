import type { z } from "zod";
import {freezeProfileParamsSchema, freezeProfileSchema} from "@/app/api/profile/freezeProfile/schemas";

export type TFreezeProfileParams = z.infer<typeof freezeProfileParamsSchema>;
export type TFreezeProfile = z.infer<typeof freezeProfileSchema>;
