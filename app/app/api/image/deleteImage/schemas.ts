import { z } from "zod";

export const deleteImageParamsSchema = z.object({
  id: z.string(),
});

export const deleteImageSchema = z.object({
  success: z.boolean(),
});
