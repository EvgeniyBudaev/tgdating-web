import { z } from "zod";

export const imageSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
});
