import { z } from "zod";
import { zfd } from "zod-form-data";

import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { EFormFields } from "@/app/pages/profilePage/enums";

export const getFilterFormSchema = zfd.formData({
  [EFormFields.SessionId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  // [EFormFields.Latitude]: z.number().nullish(),
  // [EFormFields.Longitude]: z.number().nullish(),
});
