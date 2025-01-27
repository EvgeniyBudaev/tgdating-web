"use server";

import { checkLikeFormSchema } from "@/app/actions/like/checkLike/schemas";
import { checkLike } from "@/app/api/like/checkLike/domain";
import type { TCommonResponseError } from "@/app/shared/types/error";
import { getErrorsResolver, getResponseError } from "@/app/shared/utils";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";
import { addBlock } from "@/app/api/block/addBlock/domain";

export async function checkLikeAction(prevState: any, formData: FormData) {
  const resolver = checkLikeFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  console.log("checkLikeAction resolver.success: ", resolver.success);
  console.log(
    "checkLikeAction resolver: ",
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
      ...formattedParams
    } = resolver.data;
    const checkCsrf = await checkCsrfToken(csrf);
    if (checkCsrf?.error) throw checkCsrf.error;
    // @ts-ignore
    const response = await checkLike(formattedParams, {
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
      console.log("checkLikeAction error status: ", errorResponse?.status);
      throw error;
    }
    const responseData: TCommonResponseError = await errorResponse.json();
    console.log("checkLikeAction error: ", responseData);
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
