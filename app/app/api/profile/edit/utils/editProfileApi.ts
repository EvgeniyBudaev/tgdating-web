import { fetchApi, type TApiFunction } from "@/app/api";
import type { TEditProfileParams, TEditProfile } from "@/app/api/profile/edit";
import { EFormMethods } from "@/app/shared/enums";

export const editProfileApi: TApiFunction<TEditProfileParams, TEditProfile> = (
  params,
  options,
) => {
  return fetchApi<TEditProfile>(`/api/v1/profiles`, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
