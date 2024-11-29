import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TProfileListParams,
  TProfileList,
} from "@/app/api/profile/list/types";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileListApi: TApiFunction<
  TProfileListParams,
  TProfileList
> = (params) => {
  const queryParams = {
    ...params,
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  // @ts-ignore
  const url = `/api/v1/profiles/list?${new URLSearchParams(queryParams)}`;

  return fetchApi<TProfileList>(url, {
    method: EFormMethods.Get,
  });
};
