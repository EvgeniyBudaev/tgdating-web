import { fetchApi, type TApiFunction } from "@/app/api";
import type { TUnblock, TUnblockParams } from "@/app/api/block/unblock/types";
import { EFormMethods } from "@/app/shared/enums";

export const unblock: TApiFunction<TUnblockParams, TUnblock> = (
  params,
  options,
) => {
  return fetchApi<TUnblock>(`/api/v1/profiles/unblock`, {
    method: EFormMethods.Put,
    body: params,
    headers: options?.headers,
  });
};
