import { z } from "zod";
import { zfd } from "zod-form-data";
import { EAddLikeFormFields } from "@/app/pages/profilePage/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const addLikeFormSchema = zfd.formData({
  [EAddLikeFormFields.SessionId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.LikedUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.Message]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.Username]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
