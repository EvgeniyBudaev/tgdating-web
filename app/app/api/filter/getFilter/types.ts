import type { z } from "zod";
import {
  getFilterParamsSchema,
} from "@/app/api/filter/getFilter/schemas";

export type TGetFilterParams = z.infer<typeof getFilterParamsSchema>;
