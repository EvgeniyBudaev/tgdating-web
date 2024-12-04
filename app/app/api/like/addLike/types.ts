import type { z } from "zod";
import { addLikeParamsSchema } from "@/app/api/like/addLike/schemas";

export type TAddLikeParams = z.infer<typeof addLikeParamsSchema>;
