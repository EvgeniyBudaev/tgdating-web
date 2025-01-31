import { z } from "zod";
import { zfd } from "zod-form-data";

import { ENavigatorUpdateFormFields } from "@/app/actions/navigator/update/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { stringOptionalSchema } from "@/app/shared/validation/schemas";

export const updateNavigatorFormSchema = zfd.formData({
  [ENavigatorUpdateFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [ENavigatorUpdateFormFields.CountryCode]: stringOptionalSchema,
  [ENavigatorUpdateFormFields.CountryName]: stringOptionalSchema,
  [ENavigatorUpdateFormFields.City]: stringOptionalSchema,
  [ENavigatorUpdateFormFields.Latitude]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [ENavigatorUpdateFormFields.Longitude]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [ENavigatorUpdateFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [ENavigatorUpdateFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
