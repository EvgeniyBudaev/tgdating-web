import type { z } from "zod";
import { updateLikeParamsSchema } from "@/app/api/like/update/schemas";

export type TUpdateLikeParams = z.infer<typeof updateLikeParamsSchema>;
