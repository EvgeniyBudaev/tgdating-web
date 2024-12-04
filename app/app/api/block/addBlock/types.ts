import type { z } from "zod";
import { addBlockParamsSchema, blockSchema } from "@/app/api/block/addBlock/schemas";

export type TAddBlockParams = z.infer<typeof addBlockParamsSchema>;
export type TBlock = z.infer<typeof blockSchema>;
