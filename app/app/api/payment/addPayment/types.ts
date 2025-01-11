import type { z } from "zod";
import {
  addPaymentParamsSchema,
  paymentSchema,
} from "@/app/api/payment/addPayment/schemas";

export type TAddPaymentParams = z.infer<typeof addPaymentParamsSchema>;
export type TPayment = z.infer<typeof paymentSchema>;
