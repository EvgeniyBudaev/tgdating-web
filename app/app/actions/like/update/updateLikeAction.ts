"use server";

import { revalidatePath } from "next/cache";
import { updateLikeFormSchema } from "@/app/actions/like/update/schemas";
import { updateLike } from "@/app/api/like/update";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";

export async function updateLikeAction(prevState: any, formData: FormData) {
  const resolver = updateLikeFormSchema.safeParse(
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
    id: Number(resolver.data.id),
    isLiked: Boolean(JSON.parse(resolver.data.isLiked)),
    sessionId: resolver.data.sessionId,
  };
  const accessToken = resolver.data.telegramInitDataCrypt;
  const csrf = resolver.data.csrf;

  try {
    const checkCsrf = await checkCsrfToken(csrf);
    if (checkCsrf?.error) throw checkCsrf.error;
    const response = await updateLike(formattedParams, {
      headers: {
        Authorization: accessToken,
      },
    });
    const path = createPath({
      route: ERoutes.ProfileDetail,
      params: {
        sessionId: (resolver.data.sessionId ?? "").toString(),
        viewedSessionId: (resolver.data.likedSessionId ?? "").toString(),
      },
      lng: resolver.data.language,
    });
    revalidatePath(path);
    return {
      data: response,
      error: undefined,
      errors: undefined,
      success: true,
    };
  } catch (error) {
    const errorResponse = error as Response;
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
