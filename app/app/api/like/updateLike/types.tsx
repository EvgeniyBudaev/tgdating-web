import type { z } from "zod";
import { updateLikeParamsSchema } from "@/app/api/like/updateLike/schemas";

export type TUpdateLikeParams = z.infer<typeof updateLikeParamsSchema>;
