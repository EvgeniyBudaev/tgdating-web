import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TDeleteProfileParams,
  TDeleteProfile,
} from "@/app/api/profile/delete/types";
import { EFormMethods } from "@/app/shared/enums";

export const deleteProfileApi: TApiFunction<
  TDeleteProfileParams,
  TDeleteProfile
> = (params) => {
  return fetchApi<TDeleteProfile>(`/gateway/api/v1/profiles`, {
    method: EFormMethods.Delete,
    body: params,
  });
};
