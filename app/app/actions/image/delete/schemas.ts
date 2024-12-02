import { z } from "zod";
import { zfd } from "zod-form-data";
import { EImageDeleteFormFields } from "@/app/actions/image/delete/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const deleteImageFormSchema = zfd.formData({
  [EImageDeleteFormFields.Id]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EImageDeleteFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EImageDeleteFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
