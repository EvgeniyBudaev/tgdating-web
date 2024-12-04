import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TAddProfileParams,
  TAddProfile,
} from "@/app/api/profile/addProfile/types";
import { EFormMethods } from "@/app/shared/enums";

export const addProfile: TApiFunction<TAddProfileParams, TAddProfile> = (
  params,
  options,
) => {
  return fetchApi<TAddProfile>(`/api/v1/profiles`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
