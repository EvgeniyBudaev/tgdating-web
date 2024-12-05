import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TProfileShortInfo,
  TGetProfileShortInfoParams,
} from "@/app/api/profile/getProfileShortInfo/types";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileShortInfo: TApiFunction<
  TGetProfileShortInfoParams,
  TProfileShortInfo
> = (params) => {
  const { telegramUserId } = params;
  const url = `/api/v1/profiles/short/${telegramUserId}`;
  return fetchApi<TProfileShortInfo>(url, {
    method: EFormMethods.Get,
  });
};
