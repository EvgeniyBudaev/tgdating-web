import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TAddPaymentParams,
  TPayment,
} from "@/app/api/payment/addPayment/types";
import { EFormMethods } from "@/app/shared/enums";

export const addPayment: TApiFunction<TAddPaymentParams, TPayment> = (
  params,
  options,
) => {
  return fetchApi<TPayment>(`/api/v1/profiles/payments`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
