import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TCheckPremium,
  TCheckPremiumParams,
} from "@/app/api/payment/checkPremium/types";
import { EFormMethods } from "@/app/shared/enums";

export const checkPremium: TApiFunction<TCheckPremiumParams, TCheckPremium> = (
  params,
) => {
  const { telegramUserId } = params;
  const url = `/api/v1/profiles/${telegramUserId}/premium/check`;
  return fetchApi<TCheckPremium>(url, {
    method: EFormMethods.Get,
  });
};
