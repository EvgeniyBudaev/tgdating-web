import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { imageFileSchema } from "@/app/api/upload";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import { EProfileEditFormFields } from "@/app/actions/profile/edit/enums";

export const addProfileFormSchema = zfd.formData({
  [EProfileEditFormFields.SessionId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.DisplayName]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.Birthday]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.Gender]: z
    .enum([EGender.Man, EGender.Woman, ""])
    .transform((value) => {
      return isEmpty(value) || isNil(value) ? "" : value;
    })
    .refine(
      (value) => {
        return !isNil(value) && !isEmpty(value);
      },
      {
        message: EMPTY_FIELD_ERROR_MESSAGE,
      },
    ),
  [EProfileAddFormFields.SearchGender]: z.enum([
    ESearchGender.Man,
    ESearchGender.Woman,
    ESearchGender.All,
    "",
  ]),
  [EProfileAddFormFields.Location]: z.string().trim(),
  [EProfileAddFormFields.Description]: z.string().trim(),
  [EProfileAddFormFields.Height]: z.string().trim(),
  [EProfileAddFormFields.Weight]: z.string().trim(),
  [EProfileAddFormFields.LookingFor]: z.enum([
    ELookingFor.Chat,
    ELookingFor.Dates,
    ELookingFor.Relationship,
    ELookingFor.Friendship,
    ELookingFor.Business,
    ELookingFor.Sex,
    ELookingFor.All,
    "",
  ]),
  // [EProfileAddFormFields.Image]: imageFileSchema,
  [EProfileAddFormFields.Image]: z.any(),
  [EProfileAddFormFields.TelegramUserID]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.TelegramUsername]: z.string().trim(),
  [EProfileAddFormFields.TelegramFirstName]: z.string().trim(),
  [EProfileAddFormFields.TelegramLastName]: z.string().trim(),
  [EProfileAddFormFields.TelegramLanguageCode]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.TelegramAllowsWriteToPm]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.TelegramQueryId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.TelegramChatId]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.Latitude]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.Longitude]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.AgeFrom]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.AgeTo]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.Distance]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.Page]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.Size]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
// .superRefine(({ image }, ctx) => {
//   if (isNil(image)) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       path: [EProfileEditFormFields.Image],
//       message: EMPTY_FIELD_ERROR_MESSAGE,
//     });
//   }
//   if (
//     !isNil(image) &&
//     !Array.isArray(image) &&
//     image.size > MAX_FILE_SIZE
//   ) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       path: [EProfileEditFormFields.Image],
//       message: FILE_MAX_SIZE_MESSAGE,
//     });
//   }
// });
