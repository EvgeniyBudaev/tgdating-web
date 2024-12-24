"use server";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { addProfileFormSchema } from "@/app/actions/profile/addProfile/schemas";
import { addProfile } from "@/app/api/profile/addProfile/domain";
import type { TAddProfileParams } from "@/app/api/profile/addProfile/types";
import { EProfileAddFormFields } from "@/app/actions/profile/addProfile/enums";
import { mapSignupToDto } from "@/app/actions/profile/addProfile/mapSignupToDto";
import type { TCommonResponseError } from "@/app/shared/types/error";
import { getResponseError, getErrorsResolver } from "@/app/shared/utils";
import { checkCsrfToken } from "@/app/shared/utils/security/csrf";

export async function addProfileAction(prevState: any, formData: FormData) {
  const resolver = addProfileFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!resolver.success) {
    // @ts-ignore
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

    const mapperParams = mapSignupToDto(formattedParams);

    const profileFormData = new FormData();
    profileFormData.append(
      EProfileAddFormFields.DisplayName,
      mapperParams.profileForm.displayName,
    );
    profileFormData.append(
      EProfileAddFormFields.Age,
      mapperParams.profileForm.age,
    );
    profileFormData.append(
      EProfileAddFormFields.Gender,
      mapperParams.profileForm.gender,
    );
    mapperParams.profileForm?.searchGender &&
      profileFormData.append(
        EProfileAddFormFields.SearchGender,
        mapperParams.profileForm.searchGender,
      );
    mapperParams.profileForm?.location &&
      profileFormData.append(
        EProfileAddFormFields.Location,
        mapperParams.profileForm.location,
      );
    mapperParams.profileForm?.description &&
      profileFormData.append(
        EProfileAddFormFields.Description,
        mapperParams.profileForm.description,
      );
    if (formData.getAll("image")?.length) {
      (formData.getAll("image") ?? []).forEach((item) => {
        profileFormData.append(EProfileAddFormFields.Image, item);
      });
    }
    profileFormData.append(
      EProfileAddFormFields.TelegramUserID,
      mapperParams.profileForm.telegramUserId,
    );
    mapperParams.profileForm?.telegramUsername &&
      profileFormData.append(
        EProfileAddFormFields.TelegramUsername,
        mapperParams.profileForm.telegramUsername,
      );
    mapperParams.profileForm?.telegramFirstName &&
      profileFormData.append(
        EProfileAddFormFields.TelegramFirstName,
        mapperParams.profileForm.telegramFirstName,
      );
    mapperParams.profileForm?.telegramLastName &&
      profileFormData.append(
        EProfileAddFormFields.TelegramLastName,
        mapperParams.profileForm.telegramLastName,
      );
    profileFormData.append(
      EProfileAddFormFields.TelegramLanguageCode,
      mapperParams.profileForm.telegramLanguageCode,
    );
    profileFormData.append(
      EProfileAddFormFields.TelegramAllowsWriteToPm,
      mapperParams.profileForm.telegramAllowsWriteToPm,
    );
    profileFormData.append(
      EProfileAddFormFields.TelegramQueryId,
      mapperParams.profileForm.telegramQueryId,
    );
    if (
      !isNil(mapperParams.profileForm?.latitude) &&
      !isEmpty(mapperParams.profileForm?.latitude)
    ) {
      profileFormData.append(
        EProfileAddFormFields.Latitude,
        mapperParams.profileForm.latitude,
      );
    }
    if (
      !isNil(mapperParams.profileForm?.longitude) &&
      !isEmpty(mapperParams.profileForm?.longitude)
    ) {
      profileFormData.append(
        EProfileAddFormFields.Longitude,
        mapperParams.profileForm.longitude,
      );
    }
    profileFormData.append(
      EProfileAddFormFields.AgeFrom,
      mapperParams.profileForm.ageFrom,
    );
    profileFormData.append(
      EProfileAddFormFields.AgeTo,
      mapperParams.profileForm.ageTo,
    );
    profileFormData.append(
      EProfileAddFormFields.Distance,
      mapperParams.profileForm.distance,
    );
    profileFormData.append(
      EProfileAddFormFields.Page,
      mapperParams.profileForm.page,
    );
    profileFormData.append(
      EProfileAddFormFields.Size,
      mapperParams.profileForm.size,
    );
    profileFormData.append(
      EProfileAddFormFields.IsLeftHand,
      mapperParams.profileForm.isLeftHand,
    );

    const response = await addProfile(
      profileFormData as unknown as TAddProfileParams,
      {
        headers: {
          Authorization: accessToken,
        },
      },
    );
    return {
      data: response,
      error: undefined,
      errors: undefined,
      success: true,
    };
  } catch (error) {
    const errorResponse = error as Response;
    console.log("addProfileAction errorResponse: ", errorResponse);
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
