import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TGetProfileListParams,
  TProfileList,
} from "@/app/api/profile/getProfileList/types";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileList: TApiFunction<
  TGetProfileListParams,
  TProfileList
> = (params) => {
  const queryParams = {
    ...params,
    ...(params?.countryCode && { countryCode: params?.countryCode }),
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  // @ts-ignore
  const url = `/api/v1/profiles/list?${new URLSearchParams(queryParams)}`;

  return fetchApi<TProfileList>(url, {
    method: EFormMethods.Get,
  });
};
