import { fetchApi, type TApiFunction } from "@/app/api";
import type {
  TDeleteImageParams,
  TDeleteImage,
} from "@/app/api/profile/image/delete";
import { EFormMethods } from "@/app/shared/enums";

export const deleteImageApi: TApiFunction<TDeleteImageParams, TDeleteImage> = (
  params,
  options,
) => {
  const { id } = params;
  const url = `/api/v1/profiles/images/${id}`;
  return fetchApi<TDeleteImage>(url, {
    method: EFormMethods.Delete,
    body: params,
    headers: options?.headers,
  });
};
