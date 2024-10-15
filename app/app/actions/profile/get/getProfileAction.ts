"use server";

import { revalidatePath } from "next/cache";
import { getProfileFormSchema } from "@/app/actions/profile/get/schemas";
import { getProfile } from "@/app/api/profile/get";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";

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
    // const path = createPath({
    //   route: ERoutes.ProfileEdit,
    //   params: { id: resolver.data.id },
    // });
    // revalidatePath(path);
    return {
      data: response,
      error: undefined,
      errors: undefined,
      success: true,
    };
    // return {
    //   data: undefined,
    //   errorUI: undefined,
    //   errors: undefined,
    //   success: true,
    // };
  } catch (error) {
    const errorResponse = error as Response;
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
