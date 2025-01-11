"use server";

import { revalidatePath } from "next/cache";
import { deleteImageFormSchema } from "@/app/actions/image/deleteImage/schemas";
import { deleteImage } from "@/app/api/image/deleteImage/domain";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";
import { ERoutes } from "@/app/shared/enums";

export async function deleteImageAction(prevState: any, formData: FormData) {
  const resolver = deleteImageFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!resolver.success) {
    const errors = getErrorsResolver(resolver);
    return {
      data: undefined,
      error: undefined,
      errors: errors,
      success: false,
    };
  }

  try {
    const {
      csrf,
      telegramInitDataCrypt: accessToken,
      telegramUserId,
      ...formattedParams
    } = resolver.data;
    const checkCsrf = await checkCsrfToken(csrf);
    if (checkCsrf?.error) throw checkCsrf.error;

    const response = await deleteImage(formattedParams, {
      headers: {
        Authorization: accessToken,
      },
    });
    const path = createPath({
      route: ERoutes.ProfileEdit,
      params: { telegramUserId },
    });
    revalidatePath(path);
    return {
      data: response,
      errorUI: undefined,
      errors: undefined,
      success: true,
    };
  } catch (error) {
    const errorResponse = error as Response;
    console.error("deleteImageAction errorResponse: ", errorResponse);
    if (errorResponse?.status === 403) throw error;
    const responseData: TCommonResponseError = await errorResponse.json();
    const { message: formError, fieldErrors } =
      getResponseError(responseData) ?? {};
    return {
      data: undefined,
      error: formError,
      errors: fieldErrors,
      success: false,
    };
  }
}
