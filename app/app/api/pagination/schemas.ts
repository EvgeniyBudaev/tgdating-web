import { z } from "zod";

export const paginationSchema = z.object({
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
  page: z.number(),
  size: z.number(),
  numberEntities: z.number(),
  totalPages: z.number(),
});
