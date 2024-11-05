"use server";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { editProfileFormSchema } from "@/app/actions/profile/edit/schemas";
import { editProfile, type TEditProfileParams } from "@/app/api/profile/edit";
import { mapUpdateToDto } from "@/app/api/profile/edit/utils";
import { EProfileEditFormFields } from "@/app/actions/profile/edit/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import { getResponseError, getErrorsResolver } from "@/app/shared/utils";

export async function editProfileAction(prevState: any, formData: FormData) {
  const resolver = editProfileFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  console.log("editProfileAction resolver.success: ", resolver.success);
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
    const { telegramInitDataCrypt: accessToken, ...formattedParams } =
      resolver.data;
    // @ts-ignore
    const mapperParams = mapUpdateToDto(formattedParams);
    console.log("editProfileAction mapperParams: ", mapperParams);

    const profileFormData = new FormData();
    profileFormData.append(
      EProfileEditFormFields.SessionId,
      mapperParams.profileForm.sessionId,
    );
    profileFormData.append(
      EProfileEditFormFields.DisplayName,
      mapperParams.profileForm.displayName,
    );
    profileFormData.append(
      EProfileEditFormFields.Birthday,
      mapperParams.profileForm.birthday,
    );
    profileFormData.append(
      EProfileEditFormFields.Gender,
      mapperParams.profileForm.gender,
    );
    mapperParams.profileForm?.searchGender &&
      profileFormData.append(
        EProfileEditFormFields.SearchGender,
        mapperParams.profileForm.searchGender,
      );
    mapperParams.profileForm?.location &&
      profileFormData.append(
        EProfileEditFormFields.Location,
        mapperParams.profileForm.location,
      );
    mapperParams.profileForm?.description &&
      profileFormData.append(
        EProfileEditFormFields.Description,
        mapperParams.profileForm.description,
      );
    mapperParams.profileForm?.height &&
      profileFormData.append(
        EProfileEditFormFields.Height,
        mapperParams.profileForm.height,
      );
    mapperParams.profileForm?.weight &&
      profileFormData.append(
        EProfileEditFormFields.Weight,
        mapperParams.profileForm.weight,
      );
    mapperParams.profileForm?.lookingFor &&
      profileFormData.append(
        EProfileEditFormFields.LookingFor,
        mapperParams.profileForm.lookingFor,
      );
    if (formData.getAll(EProfileEditFormFields.Image)?.length) {
      (formData.getAll(EProfileEditFormFields.Image) ?? []).forEach((item) => {
        profileFormData.append(EProfileEditFormFields.Image, item);
      });
    }
    profileFormData.append(
      EProfileEditFormFields.TelegramUserID,
      mapperParams.profileForm.telegramUserId,
    );
    mapperParams.profileForm?.telegramUsername &&
      profileFormData.append(
        EProfileEditFormFields.TelegramUsername,
        mapperParams.profileForm.telegramUsername,
      );
    mapperParams.profileForm?.telegramFirstName &&
      profileFormData.append(
        EProfileEditFormFields.TelegramFirstName,
        mapperParams.profileForm.telegramFirstName,
      );
    mapperParams.profileForm?.telegramLastName &&
      profileFormData.append(
        EProfileEditFormFields.TelegramLastName,
        mapperParams.profileForm.telegramLastName,
      );
    profileFormData.append(
      EProfileEditFormFields.TelegramLanguageCode,
      mapperParams.profileForm.telegramLanguageCode,
    );
    profileFormData.append(
      EProfileEditFormFields.TelegramAllowsWriteToPm,
      mapperParams.profileForm.telegramAllowsWriteToPm,
    );
    profileFormData.append(
      EProfileEditFormFields.TelegramQueryId,
      mapperParams.profileForm.telegramQueryId,
    );
    if (
      !isNil(mapperParams.profileForm.latitude) &&
      !isEmpty(mapperParams.profileForm.latitude)
    ) {
      profileFormData.append(
        EProfileEditFormFields.Latitude,
        String(mapperParams.profileForm.latitude),
      );
    }
    if (
      !isNil(mapperParams.profileForm.longitude) &&
      !isEmpty(mapperParams.profileForm.longitude)
    ) {
      profileFormData.append(
        EProfileEditFormFields.Longitude,
        String(mapperParams.profileForm.longitude),
      );
    }
    profileFormData.append(
      EProfileEditFormFields.AgeFrom,
      mapperParams.profileForm.ageFrom,
    );
    profileFormData.append(
      EProfileEditFormFields.AgeTo,
      mapperParams.profileForm.ageTo,
    );
    profileFormData.append(
      EProfileEditFormFields.Distance,
      mapperParams.profileForm.distance,
    );
    profileFormData.append(
      EProfileEditFormFields.Page,
      mapperParams.profileForm.page,
    );
    profileFormData.append(
      EProfileEditFormFields.Size,
      mapperParams.profileForm.size,
    );
    profileFormData.append(
      EProfileEditFormFields.IsImages,
      mapperParams.profileForm.isImages,
    );

    const response = await editProfile(
      profileFormData as unknown as TEditProfileParams,
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
    const responseData: TCommonResponseError = await errorResponse.json();
    console.log("editProfileAction errorResponseData: ", responseData);
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
