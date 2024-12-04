import { fetchApi, TApiFunction } from "@/app/api";
import type { TProfileParams, TProfile } from "@/app/api/profile/getProfile/types";
import { EFormMethods } from "@/app/shared/enums";

export const getProfile: TApiFunction<TProfileParams, TProfile> = (
  params,
) => {
  const { telegramUserId } = params;
  const queryParams = {
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  const url = `/api/v1/profiles/telegram/${telegramUserId}?${new URLSearchParams(queryParams)}`;
  return fetchApi<TProfile>(url, {
    method: EFormMethods.Get,
  });
};
