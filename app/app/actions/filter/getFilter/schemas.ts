import { z } from "zod";
import { zfd } from "zod-form-data";

import { EFilterGetFormFields } from "@/app/actions/filter/getFilter/enums";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const getFilterFormSchema = zfd.formData({
  [EFilterGetFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
