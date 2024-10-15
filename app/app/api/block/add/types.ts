import type { z } from "zod";
import { addBlockParamsSchema, blockSchema } from "@/app/api/block/add/schemas";

export type TBlock = z.infer<typeof blockSchema>;
export type TAddBlockParams = z.infer<typeof addBlockParamsSchema>;
