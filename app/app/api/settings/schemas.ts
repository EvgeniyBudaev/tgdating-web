import { z } from "zod";
import { EMeasurement } from "@/app/shared/enums/form";

export const settingsSchema = z.object({
  measurement: z.enum([EMeasurement.Metric, EMeasurement.American]),
});
