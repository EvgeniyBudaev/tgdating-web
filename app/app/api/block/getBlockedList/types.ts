import type { z } from "zod";
import {
  getBlockedListParamsSchema,
  getBlockedListSchema,
} from "@/app/api/block/getBlockedList/schemas";

export type TGetBlockedListParams = z.infer<typeof getBlockedListParamsSchema>;
export type TBlockedList = z.infer<typeof getBlockedListSchema>;
