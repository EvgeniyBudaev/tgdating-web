import { z } from "zod";

export const checkProfileExistsParamsSchema = z.object({
  telegramUserId: z.string(),
});

export const checkProfileExistsSchema = z.object({
  isExists: z.boolean(),
});
