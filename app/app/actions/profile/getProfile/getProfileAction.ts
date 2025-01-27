"use server";

import { getProfileFormSchema } from "@/app/actions/profile/getProfile/schemas";
import { getProfile } from "@/app/api/profile/getProfile/domain";
import type { TCommonResponseError } from "@/app/shared/types/error";
import { getResponseError, getErrorsResolver } from "@/app/shared/utils";

export async function getProfileAction(prevState: any, formData: FormData) {
  const resolver = getProfileFormSchema.safeParse(
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
    const formattedParams = {
      ...resolver.data,
    };

    const response = await getProfile(formattedParams);
    return {
      data: response,
      error: undefined,
      errors: undefined,
      success: true,
    };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 401 || errorResponse?.status === 403) {
      console.log("getProfileAction error status: ", errorResponse?.status);
      throw error;
    }
    const responseData: TCommonResponseError = await errorResponse.json();
    console.log("getProfileAction error: ", responseData);
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
