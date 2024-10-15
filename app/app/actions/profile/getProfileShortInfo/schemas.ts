import { z } from "zod";
import { zfd } from "zod-form-data";
import { EFormFields } from "@/app/actions/profile/getProfileShortInfo/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const getProfileShortInfoFormSchema = zfd.formData({
  [EFormFields.SessionId]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EFormFields.Latitude]: z.string().nullish(),
  [EFormFields.Longitude]: z.string().nullish(),
});
