import { z } from "zod";
import { zfd } from "zod-form-data";
import { EBlockFormFields } from "@/app/actions/block/add/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const addBlockFormSchema = zfd.formData({
  [EBlockFormFields.SessionId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EBlockFormFields.BlockedUserSessionId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EBlockFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EBlockFormFields.Csrf]: z.string().trim().min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
