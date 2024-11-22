import { z } from "zod";
import { zfd } from "zod-form-data";
import {EProfileDeleteFormFields} from "@/app/actions/profile/delete/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const deleteProfileFormSchema = zfd.formData({
  [EProfileDeleteFormFields.SessionId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileDeleteFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileDeleteFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
