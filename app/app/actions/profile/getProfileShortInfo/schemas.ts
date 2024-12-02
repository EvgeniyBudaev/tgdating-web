import { z } from "zod";
import { zfd } from "zod-form-data";
import { EGetProfileShortInfoFields } from "@/app/actions/profile/getProfileShortInfo/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const getProfileShortInfoFormSchema = zfd.formData({
  [EGetProfileShortInfoFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EGetProfileShortInfoFields.Latitude]: z.string().nullish(),
  [EGetProfileShortInfoFields.Longitude]: z.string().nullish(),
});
