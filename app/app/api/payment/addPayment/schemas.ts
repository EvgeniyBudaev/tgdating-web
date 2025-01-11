import { z } from "zod";

export const addPaymentParamsSchema = z.object({
  telegramUserId: z.string(),
  price: z.string(),
  currency: z.string(),
  tariff: z.string(),
});

export const paymentSchema = z.object({
  id: z.number(),
  telegramUserId: z.string(),
  price: z.string(),
  currency: z.string(),
  tariff: z.string(),
  created_at: z.string(),
});
