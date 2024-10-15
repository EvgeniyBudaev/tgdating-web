import { fetchApi, type TApiFunction } from "@/app/api";
import type { TAddComplaintParams, TComplaint } from "@/app/api/complaint/add";
import { EFormMethods } from "@/app/shared/enums";

export const addComplaintApi: TApiFunction<TAddComplaintParams, TComplaint> = (
  params,
) => {
  return fetchApi<TComplaint>(`/api/v1/profiles/complaints`, {
    method: EFormMethods.Post,
    body: params,
  });
};
