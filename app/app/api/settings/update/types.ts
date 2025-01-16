import type { z } from "zod";
import {
  updateSettingsParamsSchema,
  updateSettingsSchema,
} from "@/app/api/settings/update/schemas";

export type TUpdateSettingsParams = z.infer<typeof updateSettingsParamsSchema>;
export type TUpdateSettings = z.infer<typeof updateSettingsSchema>;
