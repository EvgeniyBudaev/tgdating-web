import type { z } from "zod";
import {
  filterParamsSchema,
  filterUpdateParamsSchema,
  filterSchema,
} from "@/app/api/profile/filter/schemas";

export type TFilter = z.infer<typeof filterSchema>;
export type TFilterParams = z.infer<typeof filterParamsSchema>;
export type TFilterUpdateParams = z.infer<typeof filterUpdateParamsSchema>;
