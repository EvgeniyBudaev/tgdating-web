"use server";

import { restoreProfileFormSchema } from "@/app/actions/profile/restoreProfile/schemas";
import { restoreProfile } from "@/app/api/profile/restoreProfile/domain";
import { getErrorsResolver, getResponseError } from "@/app/shared/utils";
import type { TCommonResponseError } from "@/app/shared/types/error";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";

export async function restoreProfileAction(prevState: any, formData: FormData) {
  const resolver = restoreProfileFormSchema.safeParse(
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
    telegramUserId: resolver.data.telegramUserId,
  };
  const accessToken = resolver.data.telegramInitDataCrypt;
  const csrf = resolver.data.csrf;

  try {
    const checkCsrf = await checkCsrfToken(csrf);
    if (checkCsrf?.error) throw checkCsrf.error;
    const response = await restoreProfile(formattedParams, {
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
    if (errorResponse?.status === 401 || errorResponse?.status === 403) {
      console.log("restoreProfileAction error status: ", errorResponse?.status);
      throw error;
    }
    const responseData: TCommonResponseError = await errorResponse.json();
    console.log("restoreProfileAction error: ", responseData);
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
