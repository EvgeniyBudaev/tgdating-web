"use server";

import isEmpty from "lodash/isEmpty";
import { revalidatePath } from "next/cache";
import { updateFilterFormSchema } from "@/app/actions/filter/update/schemas";
import { TFilterUpdateParams, updateFilter } from "@/app/api/profile/filter";
import { updateNavigator } from "@/app/api/profile/navigator";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";
import { EFormFields } from "@/app/actions/filter/update/enums";

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
    const formattedParams = {
      ...resolver.data,
    };
    const filterFormData = new FormData();
    filterFormData.append(EFormFields.SessionId, formattedParams.sessionId);
    filterFormData.append(
      EFormFields.SearchGender,
      formattedParams.searchGender,
    );
    filterFormData.append(EFormFields.LookingFor, formattedParams.lookingFor);
    filterFormData.append(EFormFields.AgeFrom, formattedParams.ageFrom);
    filterFormData.append(EFormFields.AgeTo, formattedParams.ageTo);
    filterFormData.append(EFormFields.Distance, formattedParams.distance);
    filterFormData.append(EFormFields.Page, formattedParams.page);
    filterFormData.append(EFormFields.Size, formattedParams.size);
    formattedParams?.latitude &&
      filterFormData.append(EFormFields.Latitude, formattedParams.latitude);
    formattedParams?.longitude &&
      filterFormData.append(EFormFields.Longitude, formattedParams.longitude);

    const responseFilter = await updateFilter(
      filterFormData as unknown as TFilterUpdateParams,
    );
    // const path = createPath({
    //   route: ERoutes.ProfileEdit,
    //   params: { id: resolver.data.id },
    // });
    // revalidatePath(path);
    return {
      data: responseFilter,
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
