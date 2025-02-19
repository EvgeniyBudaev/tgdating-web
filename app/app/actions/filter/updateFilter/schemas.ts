import { z } from "zod";
import { zfd } from "zod-form-data";

import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { EFilterUpdateFormFields } from "@/app/actions/filter/updateFilter/enums";

export const updateFilterFormSchema = zfd.formData({
  [EFilterUpdateFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFilterUpdateFormFields.SearchGender]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFilterUpdateFormFields.AgeFrom]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFilterUpdateFormFields.AgeTo]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFilterUpdateFormFields.Distance]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFilterUpdateFormFields.IsLiked]: z.preprocess(
    (v) => (typeof v === "string" ? v === "true" : !!v),
    z.boolean(),
  ),
  [EFilterUpdateFormFields.IsOnline]: z.preprocess(
    (v) => (typeof v === "string" ? v === "true" : !!v),
    z.boolean(),
  ),
  [EFilterUpdateFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFilterUpdateFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
