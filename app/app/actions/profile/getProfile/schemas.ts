import { z } from "zod";
import { zfd } from "zod-form-data";
import { EFormFields } from "@/app/actions/profile/getProfile/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const getProfileFormSchema = zfd.formData({
  [EFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.CountryCode]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Latitude]: z.string().nullish(),
  [EFormFields.Longitude]: z.string().nullish(),
});
