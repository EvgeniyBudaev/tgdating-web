import { fetchApi, type TApiFunction } from "@/app/api";
import type {TDeleteImage, TDeleteImageParams} from "@/app/api/image/deleteImage/types";
import { EFormMethods } from "@/app/shared/enums";

export const deleteImage: TApiFunction<TDeleteImageParams, TDeleteImage> = (
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
