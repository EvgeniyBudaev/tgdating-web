import { fetchApi, type TApiFunction } from "@/app/api";
import type {TEditProfile, TEditProfileParams} from "@/app/api/profile/editProfile/types";
import { EFormMethods } from "@/app/shared/enums";

export const editProfile: TApiFunction<TEditProfileParams, TEditProfile> = (
  params,
  options,
) => {
  return fetchApi<TEditProfile>(`/api/v1/profiles`, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
