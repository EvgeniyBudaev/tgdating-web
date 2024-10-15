import { fetchApi, type TApiFunction } from "@/app/api";
import type { TAddBlockParams, TBlock } from "@/app/api/block/add";
import { EFormMethods } from "@/app/shared/enums";

export const addBlockApi: TApiFunction<TAddBlockParams, TBlock> = (params) => {
  return fetchApi<TBlock>(`/gateway/api/v1/profiles/blocks`, {
    method: EFormMethods.Post,
    body: params,
  });
};
