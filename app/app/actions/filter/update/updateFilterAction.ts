"use server";

import { revalidatePath } from "next/cache";
import { EFilterUpdateFormFields } from "@/app/actions/filter/update/enums";
import { updateFilterFormSchema } from "@/app/actions/filter/update/schemas";
import { TFilterUpdateParams, updateFilter } from "@/app/api/profile/filter";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { ERoutes } from "@/app/shared/enums";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";

export async function updateFilterAction(prevState: any, formData: FormData) {
  const resolver = updateFilterFormSchema.safeParse(
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
    const filterFormData = new FormData();
    const telegramUserId = formattedParams.telegramUserId;
    filterFormData.append(
      EFilterUpdateFormFields.TelegramUserId,
      telegramUserId,
    );
    filterFormData.append(
      EFilterUpdateFormFields.SearchGender,
      formattedParams.searchGender,
    );
    filterFormData.append(
      EFilterUpdateFormFields.AgeFrom,
      formattedParams.ageFrom,
    );
    filterFormData.append(EFilterUpdateFormFields.AgeTo, formattedParams.ageTo);

    const responseFilter = await updateFilter(
      filterFormData as unknown as TFilterUpdateParams,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    const path = createPath({
      route: ERoutes.Telegram,
      params: { telegramUserId: telegramUserId },
    });
    revalidatePath(path);
    return {
      data: responseFilter,
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
