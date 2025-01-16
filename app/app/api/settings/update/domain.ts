import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TUpdateSettings,
  TUpdateSettingsParams,
} from "@/app/api/settings/update/types";
import { EFormMethods } from "@/app/shared/enums";

export const updateSettings: TApiFunction<
  TUpdateSettingsParams,
  TUpdateSettings
> = (params, options) => {
  return fetchApi<TUpdateSettings>(`/api/v1/profiles/settings`, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
