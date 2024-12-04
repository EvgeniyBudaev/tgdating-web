import type { z } from "zod";
import {
  updateFilterParamsSchema,
} from "@/app/api/filter/updateFilter/schemas";

export type TUpdateFilterParams = z.infer<typeof updateFilterParamsSchema>;
