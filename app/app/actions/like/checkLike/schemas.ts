import { z } from "zod";
import { zfd } from "zod-form-data";
import {ECheckLikeFormFields} from "@/app/actions/like/checkLike/enum";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const checkLikeFormSchema = zfd.formData({
  [ECheckLikeFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
