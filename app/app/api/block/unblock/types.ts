import type { z } from "zod";
import {
  unblockParamsSchema,
  unblockSchema,
} from "@/app/api/block/unblock/schemas";

export type TUnblockParams = z.infer<typeof unblockParamsSchema>;
export type TUnblock = z.infer<typeof unblockSchema>;
