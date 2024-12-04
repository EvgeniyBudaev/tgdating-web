import type { z } from "zod";
import {
  deleteImageParamsSchema,
  deleteImageSchema,
} from "@/app/api/image/deleteImage/schemas";

export type TDeleteImageParams = z.infer<typeof deleteImageParamsSchema>;
export type TDeleteImage = z.infer<typeof deleteImageSchema>;
