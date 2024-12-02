import { z } from "zod";
import { zfd } from "zod-form-data";

import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { ENavigatorUpdateFormFields } from "@/app/actions/navigator/update/enums";

export const updateNavigatorFormSchema = zfd.formData({
  [ENavigatorUpdateFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
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
