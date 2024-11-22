import { z } from "zod";
import { zfd } from "zod-form-data";
import { EFormFields } from "@/app/actions/image/delete/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const deleteImageFormSchema = zfd.formData({
  [EFormFields.Id]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Csrf]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
