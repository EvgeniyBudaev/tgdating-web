"use server";

import { revalidatePath } from "next/cache";
import { updateNavigatorFormSchema } from "@/app/actions/navigator/update/schemas";
import { updateNavigator } from "@/app/api/profile/navigator";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";

export async function updateFilterAction(prevState: any, formData: FormData) {
  const resolver = updateNavigatorFormSchema.safeParse(
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

    const response = await updateNavigator(formattedParams);
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
