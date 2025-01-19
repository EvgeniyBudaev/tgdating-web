import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TCheckProfileExists,
  TCheckProfileExistsParams,
} from "@/app/api/profile/checkProfile/types";
import { EFormMethods } from "@/app/shared/enums";

export const checkProfileExists: TApiFunction<
  TCheckProfileExistsParams,
  TCheckProfileExists
> = (params) => {
  const { telegramUserId } = params;
  const url = `/api/v1/profiles/${telegramUserId}/check`;
  return fetchApi<TCheckProfileExists>(url, {
    method: EFormMethods.Get,
  });
};
