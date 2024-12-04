import { fetchApi, TApiFunction } from "@/app/api";
import type {TUpdateFilterParams} from "@/app/api/filter/updateFilter/types";
import type {
  TFilter,
} from "@/app/api/filter/types";
import { EFormMethods } from "@/app/shared/enums";

export const updateFilter: TApiFunction<TUpdateFilterParams, TFilter> = (
  params,
  options,
) => {
  const url = `/api/v1/profiles/filters`;
  return fetchApi<TFilter>(url, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
