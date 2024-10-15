import { z } from "zod";
import { imageSchema } from "@/app/api/profile/image/schemas";

export const deleteImageParamsSchema = z.object({
  id: z.string(),
});

export const deleteImageSchema = z.object({
  success: z.boolean(),
});
