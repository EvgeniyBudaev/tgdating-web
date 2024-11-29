import { fetchApi, TApiFunction } from "@/app/api";
import type {
  TProfileDetailParams,
  TProfileDetail,
} from "@/app/api/profile/detail/types";
import { EFormMethods } from "@/app/shared/enums";

export const getProfileDetailApi: TApiFunction<
  TProfileDetailParams,
  TProfileDetail
> = (params) => {
  const { viewedSessionId } = params;
  const queryParams = {
    ...(params?.sessionId && { sessionId: params?.sessionId }),
    ...(params?.latitude && { latitude: params?.latitude }),
    ...(params?.longitude && { longitude: params?.longitude }),
  };
  const url = `/api/v1/profiles/detail/${viewedSessionId}?${new URLSearchParams(queryParams)}`;
  return fetchApi<TProfileDetail>(url, {
    method: EFormMethods.Get,
  });
};
