"use server";

import { revalidatePath } from "next/cache";
import { addBlockFormSchema } from "@/app/actions/block/add/schemas";
import { addBlock } from "@/app/api/block/add";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";

export async function addBlockAction(prevState: any, formData: FormData) {
  const resolver = addBlockFormSchema.safeParse(
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
    ...resolver.data,
  };
  try {
    const response = await addBlock(formattedParams);
    const path = createPath({
      route: ERoutes.Session,
      params: { sessionId: resolver.data.sessionId },
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
