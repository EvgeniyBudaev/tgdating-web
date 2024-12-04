import { fetchApi, type TApiFunction } from "@/app/api";
import type { TAddComplaintParams, TComplaint } from "@/app/api/complaint/addComplaint/types";
import { EFormMethods } from "@/app/shared/enums";

export const addComplaint: TApiFunction<TAddComplaintParams, TComplaint> = (
  params,
  options,
) => {
  return fetchApi<TComplaint>(`/api/v1/profiles/complaints`, {
    method: EFormMethods.Post,
    body: params,
    headers: options?.headers,
  });
};
