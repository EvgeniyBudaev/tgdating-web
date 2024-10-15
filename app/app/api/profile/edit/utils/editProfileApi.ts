import { fetchApi, type TApiFunction } from "@/app/api";
import type { TEditProfileParams, TEditProfile } from "@/app/api/profile/edit";
import { EFormMethods } from "@/app/shared/enums";

export const editProfileApi: TApiFunction<TEditProfileParams, TEditProfile> = (
  params,
) => {
  return fetchApi<TEditProfile>(`/gateway/api/v1/profiles`, {
    method: EFormMethods.Put,
    body: params,
  });
};
