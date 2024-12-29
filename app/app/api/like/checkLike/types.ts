import type { z } from "zod";
import {checkLikeParamsSchema} from "@/app/api/like/checkLike/schemas";

export type TCheckLikeParams = z.infer<typeof checkLikeParamsSchema>;
