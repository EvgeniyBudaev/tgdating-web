import { fetchApi, type TApiFunction } from "@/app/api";
import type {TUpdateLikeParams} from "@/app/api/like/updateLike/types";
import type {TLike} from "@/app/api/like/types";
import { EFormMethods } from "@/app/shared/enums";

export const updateLike: TApiFunction<TUpdateLikeParams, TLike> = (
  params,
  options,
) => {
  return fetchApi<TLike>(`/api/v1/profiles/likes`, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
