import { fetchApi, type TApiFunction } from "@/app/api";
import type { TLike } from "@/app/api/like/add";
import type { TUpdateLikeParams } from "@/app/api/like/update";
import { EFormMethods } from "@/app/shared/enums";

export const updateLikeApi: TApiFunction<TUpdateLikeParams, TLike> = (
  params,
  options,
) => {
  return fetchApi<TLike>(`/gateway/api/v1/profiles/likes`, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
