import type { z } from "zod";
import {updateLikeParamsSchema, updateLikeSchema} from "@/app/api/like/updateLike/schemas";

export type TUpdateLikeParams = z.infer<typeof updateLikeParamsSchema>;
export type TUpdateLike = z.infer<typeof updateLikeSchema>;
