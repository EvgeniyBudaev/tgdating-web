import { fetchApi, type TApiFunction } from "@/app/api";
import type { TCheckLikeParams } from "@/app/api/like/checkLike/types";
import type { TLike } from "@/app/api/like/types";
import { EFormMethods } from "@/app/shared/enums";

export const checkLike: TApiFunction<TCheckLikeParams, TLike> = (
  params,
  options,
) => {
  return fetchApi<TLike>(`/api/v1/profiles/likes/last`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
