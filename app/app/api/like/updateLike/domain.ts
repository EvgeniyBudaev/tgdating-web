import { fetchApi, type TApiFunction } from "@/app/api";
import type {TUpdateLikeParams, TUpdateLike} from "@/app/api/like/updateLike/types";
import { EFormMethods } from "@/app/shared/enums";

export const updateLike: TApiFunction<TUpdateLikeParams, TUpdateLike> = (
  params,
  options,
) => {
  return fetchApi<TUpdateLike>(`/api/v1/profiles/likes`, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
