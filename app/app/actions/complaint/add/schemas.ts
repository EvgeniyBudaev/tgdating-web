import { z } from "zod";
import { zfd } from "zod-form-data";
import { EComplaintFormFields } from "@/app/actions/complaint/add/enums";
import { EComplaint } from "@/app/shared/enums/form";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";

export const addComplaintFormSchema = zfd.formData({
  [EComplaintFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EComplaintFormFields.CriminalTelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EComplaintFormFields.Reason]: z.enum([EComplaint.Other]),
  [EComplaintFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EComplaintFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
