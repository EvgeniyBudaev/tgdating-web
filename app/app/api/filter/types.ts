import type { z } from "zod";
import {
  filterSchema,
} from "@/app/api/filter/schemas";

export type TFilter = z.infer<typeof filterSchema>;

