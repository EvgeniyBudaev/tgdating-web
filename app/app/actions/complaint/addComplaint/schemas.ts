import { z } from "zod";
import { zfd } from "zod-form-data";
import { EComplaintFormFields } from "@/app/actions/complaint/addComplaint/enums";
import { EComplaint } from "@/app/shared/enums/complaint";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { symbolsMaxComplaintSchema } from "@/app/shared/validation/schemas";

export const addComplaintFormSchema = zfd.formData({
  [EComplaintFormFields.TelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EComplaintFormFields.CriminalTelegramUserId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EComplaintFormFields.Type]: z.nativeEnum(EComplaint),
  [EComplaintFormFields.Description]: symbolsMaxComplaintSchema,
  [EComplaintFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EComplaintFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
