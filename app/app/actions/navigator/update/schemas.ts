import { z } from "zod";
import { zfd } from "zod-form-data";

import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { EFormFields } from "@/app/actions/navigator/update/enums";

export const updateNavigatorFormSchema = zfd.formData({
  [EFormFields.SessionId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Latitude]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Longitude]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
