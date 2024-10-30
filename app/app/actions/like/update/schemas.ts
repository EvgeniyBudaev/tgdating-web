import { z } from "zod";
import { zfd } from "zod-form-data";
import { EUpdateLikeFormFields } from "@/app/actions/like/update/enum";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { EAddLikeFormFields } from "@/app/actions/like/add/enum";

export const updateLikeFormSchema = zfd.formData({
  [EUpdateLikeFormFields.Id]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EUpdateLikeFormFields.IsLiked]: z.enum(["true", "false"]),
  [EAddLikeFormFields.Language]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EAddLikeFormFields.LikedSessionId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EUpdateLikeFormFields.SessionId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
