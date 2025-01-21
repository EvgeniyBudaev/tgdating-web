import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TBlockedList,
  TGetBlockedListParams,
} from "@/app/api/block/getBlockedList/types";
import { EFormMethods } from "@/app/shared/enums";

export const getBlockedList: TApiFunction<
  TGetBlockedListParams,
  TBlockedList
> = (params) => {
  const { telegramUserId } = params;
  return fetchApi<TBlockedList>(
    `/api/v1/profiles/${telegramUserId}/blocks/list`,
    {
      method: EFormMethods.Get,
    },
  );
};
