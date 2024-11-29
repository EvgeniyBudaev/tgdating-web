import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TAddProfileParams,
  TAddProfile,
} from "@/app/api/profile/add/types";
import { EFormMethods } from "@/app/shared/enums";

export const addProfileApi: TApiFunction<TAddProfileParams, TAddProfile> = (
  params,
  options,
) => {
  console.log("addProfileApi params:", params);
  return fetchApi<TAddProfile>(`/api/v1/profiles`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
