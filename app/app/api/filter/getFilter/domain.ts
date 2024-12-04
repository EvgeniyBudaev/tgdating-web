import { fetchApi, TApiFunction } from "@/app/api";
import type {TGetFilterParams} from "@/app/api/filter/getFilter/types";
import type { TFilter } from "@/app/api/filter/types";
import { EFormMethods } from "@/app/shared/enums";

export const getFilter: TApiFunction<TGetFilterParams, TFilter> = (params) => {
  const { telegramUserId } = params;
  const queryParams = {
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  const url = `/api/v1/profiles/filter/${telegramUserId}?${new URLSearchParams(queryParams)}`;
  return fetchApi<TFilter>(url, {
    method: EFormMethods.Get,
  });
};
