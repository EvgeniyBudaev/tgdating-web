import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TFreezeProfileParams,
  TFreezeProfile,
} from "@/app/api/profile/freezeProfile/types";
import { EFormMethods } from "@/app/shared/enums";

export const freezeProfile: TApiFunction<
  TFreezeProfileParams,
  TFreezeProfile
> = (params, options) => {
  return fetchApi<TFreezeProfile>(`/api/v1/profiles/freeze`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
