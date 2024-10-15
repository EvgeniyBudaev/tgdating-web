import { z } from "zod";
import { zfd } from "zod-form-data";

import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { EFormFields } from "@/app/actions/filter/update/enums";

export const updateFilterFormSchema = zfd.formData({
  [EFormFields.SessionId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.SearchGender]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.LookingFor]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.AgeFrom]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.AgeTo]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Distance]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Page]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Size]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Latitude]: z.string().nullish(),
  [EFormFields.Longitude]: z.string().nullish(),
});
