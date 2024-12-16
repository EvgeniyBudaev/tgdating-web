import type { z } from "zod";
import {addLikeParamsSchema, addLikeSchema} from "@/app/api/like/addLike/schemas";

export type TAddLikeParams = z.infer<typeof addLikeParamsSchema>;
export type TAddLike = z.infer<typeof addLikeSchema>;
