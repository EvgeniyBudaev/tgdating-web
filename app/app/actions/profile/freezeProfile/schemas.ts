import { z } from "zod";
import { zfd } from "zod-form-data";
import { EProfileFreezeFormFields } from "@/app/actions/profile/freezeProfile/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const freezeProfileFormSchema = zfd.formData({
  [EProfileFreezeFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileFreezeFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileFreezeFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
