import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TRestoreProfileParams,
  TRestoreProfile,
} from "@/app/api/profile/restoreProfile/types";
import { EFormMethods } from "@/app/shared/enums";

export const restoreProfile: TApiFunction<
  TRestoreProfileParams,
  TRestoreProfile
> = (params, options) => {
  return fetchApi<TRestoreProfile>(`/api/v1/profiles/restore`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
