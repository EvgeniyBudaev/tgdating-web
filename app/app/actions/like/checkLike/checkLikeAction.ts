"use server";

import {checkLike} from "@/app/api/like/checkLike/domain";
import type {TCommonResponseError} from "@/app/shared/types/error";
import {getResponseError} from "@/app/shared/utils";

export async function checkLikeAction(telegramUserId: string) {
  try {
    console.log("checkLikeAction telegramUserId: ", telegramUserId);
    const response = await checkLike({telegramUserId});
    return {
      data: response,
      error: undefined,
      errors: undefined,
      success: true,
    };
  } catch (error) {
    const errorResponse = error as Response;
    console.log("checkLikeAction errorResponse: ", errorResponse);
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