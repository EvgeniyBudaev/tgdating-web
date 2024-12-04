import { fetchApi, type TApiFunction } from "@/app/api";
import type { TAddBlockParams, TBlock } from "@/app/api/block/addBlock/types";
import { EFormMethods } from "@/app/shared/enums";

export const addBlock: TApiFunction<TAddBlockParams, TBlock> = (
  params,
  options,
) => {
  return fetchApi<TBlock>(`/api/v1/profiles/blocks`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
