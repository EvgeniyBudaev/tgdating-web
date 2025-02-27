import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TDeleteProfileParams,
  TDeleteProfile,
} from "@/app/api/profile/deleteProfile/types";
import { EFormMethods } from "@/app/shared/enums";

export const deleteProfile: TApiFunction<
  TDeleteProfileParams,
  TDeleteProfile
> = (params, options) => {
  return fetchApi<TDeleteProfile>(`/api/v1/profiles`, {
    method: EFormMethods.Delete,
    body: params,
    headers: options?.headers,
  });
};
