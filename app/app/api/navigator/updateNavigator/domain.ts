import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TNavigator,
  TUpdateNavigatorParams,
} from "@/app/api/navigator/updateNavigator/types";
import { EFormMethods } from "@/app/shared/enums";

export const updateNavigator: TApiFunction<
  TUpdateNavigatorParams,
  TNavigator
> = (
  params,
  //options,
) => {
  const url = `/api/v1/profiles/navigators`;
  return fetchApi<TNavigator>(url, {
    method: EFormMethods.Put,
    body: params,
    //headers: options?.headers,
  });
};
