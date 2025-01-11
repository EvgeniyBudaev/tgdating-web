"use server";

import { addComplaintFormSchema } from "@/app/actions/complaint/addComplaint/schemas";
import { addComplaint } from "@/app/api/complaint/addComplaint/domain";
import type { TCommonResponseError } from "@/app/shared/types/error";
import { getResponseError, getErrorsResolver } from "@/app/shared/utils";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";

export async function addComplaintAction(prevState: any, formData: FormData) {
  const resolver = addComplaintFormSchema.safeParse(
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
    criminalTelegramUserId: resolver.data.criminalTelegramUserId,
    reason: resolver.data.reason,
  };
  const accessToken = resolver.data.telegramInitDataCrypt;
  const csrf = resolver.data.csrf;

  try {
    const checkCsrf = await checkCsrfToken(csrf);
    if (checkCsrf?.error) throw checkCsrf.error;
    const response = await addComplaint(formattedParams, {
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
    console.error("addComplaintAction errorResponse: ", errorResponse);
    if (errorResponse?.status === 401 || errorResponse?.status === 403)
      throw error;
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
