import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TProfileDetailParams,
  TProfileDetail,
} from "@/app/api/profile/getProfileDetail/types";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileDetail: TApiFunction<
  TProfileDetailParams,
  TProfileDetail
> = (params) => {
  const { viewedTelegramUserId } = params;
  const queryParams = {
    ...(params?.telegramUserId && { telegramUserId: params?.telegramUserId }),
    ...(params?.countryCode && { countryCode: params?.countryCode }),
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  const url = `/api/v1/profiles/detail/${viewedTelegramUserId}?${new URLSearchParams(queryParams)}`;
  return fetchApi<TProfileDetail>(url, {
    method: EFormMethods.Get,
  });
};
