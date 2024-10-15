import { z } from "zod";
import { zfd } from "zod-form-data";
import { EBlockFormFields } from "@/app/pages/profileDetailPage/block/enums";
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
});
