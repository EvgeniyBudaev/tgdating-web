import { z } from "zod";
import { zfd } from "zod-form-data";
import { EAddLikeFormFields } from "@/app/actions/like/add/enum";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const addLikeFormSchema = zfd.formData({
  [EAddLikeFormFields.Language]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.LikedTelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
