import { z } from "zod";
import { zfd } from "zod-form-data";
import { EUpdateSettingsFormFields } from "@/app/actions/settings/update/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const updateSettingsFormSchema = zfd.formData({
  [EUpdateSettingsFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EUpdateSettingsFormFields.IsHiddenAge]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EUpdateSettingsFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EUpdateSettingsFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
