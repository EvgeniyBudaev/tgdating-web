import { fetchApi, type TApiFunction } from "@/app/api";
import type { TAddLikeParams, TLike } from "@/app/api/like/add";
import { EFormMethods } from "@/app/shared/enums";

export const addLikeApi: TApiFunction<TAddLikeParams, TLike> = (
  params,
  options,
) => {
  return fetchApi<TLike>(`/api/v1/profiles/likes`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
