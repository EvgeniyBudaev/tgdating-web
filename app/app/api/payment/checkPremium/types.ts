import type { z } from "zod";
import {
  checkPremiumParamsSchema,
  checkPremiumSchema,
} from "@/app/api/payment/checkPremium/schemas";

export type TCheckPremiumParams = z.infer<typeof checkPremiumParamsSchema>;
export type TCheckPremium = z.infer<typeof checkPremiumSchema>;
