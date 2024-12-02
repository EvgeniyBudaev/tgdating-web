import { fetchApi, TApiFunction } from "@/app/api";
import {
  TProfileShortInfo,
  TProfileShortInfoParams,
} from "@/app/api/profile/shortInfo/get";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileShortInfoApi: TApiFunction<
  TProfileShortInfoParams,
  TProfileShortInfo
> = (params) => {
  const { telegramUserId } = params;
  const queryParams = {
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  const url = `/api/v1/profiles/short/${telegramUserId}?${new URLSearchParams(queryParams)}`;
  return fetchApi<TProfileShortInfo>(url, {
    method: EFormMethods.Get,
  });
};
