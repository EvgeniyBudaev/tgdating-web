import { fetchApi, type TApiFunction } from "@/app/api";
import type { TAddLikeParams, TAddLike } from "@/app/api/like/addLike/types";
import { EFormMethods } from "@/app/shared/enums";

export const addLike: TApiFunction<TAddLikeParams, TAddLike> = (
  params,
  options,
) => {
  return fetchApi<TAddLike>(`/api/v1/profiles/likes`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
