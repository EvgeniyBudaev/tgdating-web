import type { z } from "zod";
import { addLikeParamsSchema, likeSchema } from "@/app/api/like/add/schemas";

export type TLike = z.infer<typeof likeSchema>;
export type TAddLikeParams = z.infer<typeof addLikeParamsSchema>;
