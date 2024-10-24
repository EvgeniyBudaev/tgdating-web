import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TFilter,
  TFilterUpdateParams,
} from "@/app/api/profile/filter/types";
import { EFormMethods } from "@/app/shared/enums";

export const updateFilterApi: TApiFunction<TFilterUpdateParams, TFilter> = (
  params,
) => {
  const url = `/gateway/api/v1/profiles/filters`;
  return fetchApi<TFilter>(url, {
    method: EFormMethods.Put,
    body: params,
  });
};
