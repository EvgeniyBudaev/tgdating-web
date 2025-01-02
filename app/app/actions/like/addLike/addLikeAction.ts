"use server";

import { revalidatePath } from "next/cache";
import { addLikeFormSchema } from "@/app/actions/like/addLike/schemas";
import { addLike } from "@/app/api/like/addLike/domain";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";

export async function addLikeAction(prevState: any, formData: FormData) {
  const resolver = addLikeFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  console.log("addLikeAction resolver.success: ", resolver.success);
  console.log(
    "addLikeAction resolver: ",
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
    console.log("addLikeAction accessToken: ", accessToken);
    console.log("addLikeAction csrf: ", csrf);
    const checkCsrf = await checkCsrfToken(csrf);
    if (checkCsrf?.error) throw checkCsrf.error;
    // @ts-ignore
    const response = await addLike(formattedParams, {
      headers: {
        Authorization: accessToken,
      },
    });
    const path = createPath({
      route: ERoutes.ProfileDetail,
      params: {
        telegramUserId: (resolver.data.telegramUserId ?? "").toString(),
        viewedTelegramUserId: (
          resolver.data.likedTelegramUserId ?? ""
        ).toString(),
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
    console.log("addLikeAction errorResponse: ", errorResponse);
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
