import { z } from "zod";
import { zfd } from "zod-form-data";
import { EProfileRestoreFormFields } from "@/app/actions/profile/restoreProfile/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const restoreProfileFormSchema = zfd.formData({
  [EProfileRestoreFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileRestoreFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileRestoreFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
