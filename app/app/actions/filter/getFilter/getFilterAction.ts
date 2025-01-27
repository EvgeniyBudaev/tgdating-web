"use server";

import { getFilterFormSchema } from "@/app/actions/filter/getFilter/schemas";
import { getFilter } from "@/app/api/filter/getFilter/domain";
import type { TCommonResponseError } from "@/app/shared/types/error";
import { getResponseError, getErrorsResolver } from "@/app/shared/utils";

export async function getFilterAction(prevState: any, formData: FormData) {
  const resolver = getFilterFormSchema.safeParse(
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
    const response = await getFilter(formattedParams);
    return {
      data: response,
      error: undefined,
      errors: undefined,
      success: true,
    };
  } catch (error) {
    const errorResponse = error as Response;
    if (errorResponse?.status === 401 || errorResponse?.status === 403) {
      console.log("getFilterAction error status: ", errorResponse?.status);
      throw error;
    }
    const responseData: TCommonResponseError = await errorResponse.json();
    console.log("getFilterAction error: ", responseData);
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
