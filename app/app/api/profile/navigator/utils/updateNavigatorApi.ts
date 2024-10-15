import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TNavigator,
  TNavigatorParams,
} from "@/app/api/profile/navigator/types";
import { EFormMethods } from "@/app/shared/enums";

export const updateNavigatorApi: TApiFunction<TNavigatorParams, TNavigator> = (
  params,
) => {
  const url = `/gateway/api/v1/profiles/navigators`;
  return fetchApi<TNavigator>(url, {
    method: EFormMethods.Put,
    body: params,
  });
};
