"use server";

import { deleteProfileFormSchema } from "@/app/actions/profile/delete/schemas";
import { deleteProfile } from "@/app/api/profile/delete";
import {getErrorsResolver, getResponseError} from "@/app/shared/utils";
import type {TCommonResponseError} from "@/app/shared/types/error";
import {checkCsrfToken} from "@/app/shared/utils/security/csrf";

export async function deleteProfileAction(prevState: any, formData: FormData) {
  const resolver = deleteProfileFormSchema.safeParse(
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

  const formattedParams = {
    sessionId: resolver.data.sessionId,
  };
  const accessToken = resolver.data.telegramInitDataCrypt;
  const csrf = resolver.data.csrf;

  try {
    const checkCsrf = await checkCsrfToken(csrf);
    if (checkCsrf?.error) throw checkCsrf.error;
    const response = await deleteProfile(formattedParams, {
      headers: {
        Authorization: accessToken,
      },
    });
    return {
      data: response,
      error: undefined,
      errors: undefined,
      success: true,
    };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 401 || errorResponse?.status === 403) throw error;
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
