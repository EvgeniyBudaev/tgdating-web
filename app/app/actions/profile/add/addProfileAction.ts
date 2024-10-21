"use server";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { revalidatePath } from "next/cache";
import { addProfileFormSchema } from "@/app/actions/profile/add/schemas";
import { addProfile, type TAddProfileParams } from "@/app/api/profile/add";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { mapSignupToDto } from "@/app/actions/profile/add/mapSignupToDto";
import { ERoutes } from "@/app/shared/enums";
import type { TCommonResponseError } from "@/app/shared/types/error";
import {
  getResponseError,
  getErrorsResolver,
  createPath,
} from "@/app/shared/utils";

export async function addProfileAction(prevState: any, formData: FormData) {
  console.log("resolver: ", Object.fromEntries(formData.entries()));
  const resolver = addProfileFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  console.log("resolver.success: ", resolver.success);
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
    const formattedParams = {
      ...resolver.data,
    };
    // @ts-ignore
    const mapperParams = mapSignupToDto(formattedParams);
    console.log("mapperParams: ", mapperParams);

    const profileFormData = new FormData();
    const sessionId = mapperParams.profileForm.telegramUserId;
    profileFormData.append("sessionId", sessionId);
    profileFormData.append(
      EProfileAddFormFields.DisplayName,
      mapperParams.profileForm.displayName,
    );
    profileFormData.append(
      EProfileAddFormFields.Birthday,
      mapperParams.profileForm.birthday,
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
    mapperParams.profileForm?.height &&
      profileFormData.append(
        EProfileAddFormFields.Height,
        mapperParams.profileForm.height,
      );
    mapperParams.profileForm?.weight &&
      profileFormData.append(
        EProfileAddFormFields.Weight,
        mapperParams.profileForm.weight,
      );
    mapperParams.profileForm?.lookingFor &&
      profileFormData.append(
        EProfileAddFormFields.LookingFor,
        mapperParams.profileForm.lookingFor,
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
    profileFormData.append(
      EProfileAddFormFields.TelegramChatId,
      mapperParams.profileForm.telegramChatId,
    );
    if (
      !isNil(mapperParams.profileForm?.latitude) &&
      !isEmpty(mapperParams.profileForm?.latitude)
    ) {
      profileFormData.append(
        EProfileAddFormFields.Latitude,
        String(mapperParams.profileForm.latitude),
      );
    }
    if (
      !isNil(mapperParams.profileForm?.longitude) &&
      !isEmpty(mapperParams.profileForm?.longitude)
    ) {
      profileFormData.append(
        EProfileAddFormFields.Longitude,
        String(mapperParams.profileForm.longitude),
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

    const response = await addProfile(
      profileFormData as unknown as TAddProfileParams,
    );
    const path = createPath({
      route: ERoutes.Root,
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
    console.log("addProfileAction responseData: ", responseData);
    return {
      data: undefined,
      error: formError,
      errors: fieldErrors,
      success: false,
    };
  }
}
