import { fetchApi, type TApiFunction } from "@/app/api";
import type { TAddLikeParams } from "@/app/api/like/addLike/types";
import type { TLike } from "@/app/api/like/types";
import { EFormMethods } from "@/app/shared/enums";

export const addLike: TApiFunction<TAddLikeParams, TLike> = (
  params,
  options,
) => {
  return fetchApi<TLike>(`/api/v1/profiles/likes`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
