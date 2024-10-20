import { fetchApi, TApiFunction } from "@/app/api";
import type { TFilter, TFilterParams } from "@/app/api/profile/filter/types";
import { EFormMethods } from "@/app/shared/enums";

export const getFilterApi: TApiFunction<TFilterParams, TFilter> = (params) => {
  const { sessionId } = params;
  const queryParams = {
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  const url = `/gateway/api/v1/profiles/filter/${sessionId}?${new URLSearchParams(queryParams)}`;
  return fetchApi<TFilter>(url, {
    method: EFormMethods.Get,
  });
};
