"use server";

import { revalidatePath } from "next/cache";
import { getFilterFormSchema } from "@/app/actions/filter/get/schemas";
import { getFilter } from "@/app/api/profile/filter";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";

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
      // latitude: resolver.data?.latitude ? resolver.data?.latitude.toString() : null,
      // longitude: resolver.data?.longitude ? resolver.data?.longitude.toString() : null,
    };

    const response = await getFilter(formattedParams);
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
