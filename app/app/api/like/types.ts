import type { z } from "zod";
import { likeSchema } from "@/app/api/like/schemas";

export type TLike = z.infer<typeof likeSchema>;
