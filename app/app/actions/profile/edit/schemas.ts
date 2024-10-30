import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema, MAX_FILE_SIZE } from "@/app/api/upload";
import { EProfileEditFormFields } from "@/app/actions/profile/edit/enums";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import {
  EMPTY_FIELD_ERROR_MESSAGE,
  FILE_MAX_SIZE_MESSAGE,
  HEIGHT_MIN_SIZE_MESSAGE,
  WEIGHT_MIN_SIZE_MESSAGE,
} from "@/app/shared/validation";
import {
  numberNonNegativeOptionalSchema,
  numberNonNegativeWithMaxHeightOptionalSchema,
  numberNonNegativeWithMaxWeightOptionalSchema,
  stringOptionalSchema,
  symbolsMaxDisplayNameSchema,
} from "@/app/shared/validation/schemas";
import { HEIGHT_MIN_SIZE, WEIGHT_MIN_SIZE } from "@/app/shared/constants";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";

export const editProfileFormSchema = zfd
  .formData({
    [EProfileEditFormFields.SessionId]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.DisplayName]: symbolsMaxDisplayNameSchema,
    [EProfileEditFormFields.Birthday]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.Gender]: z
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
    [EProfileEditFormFields.SearchGender]: z.enum([
      ESearchGender.Man,
      ESearchGender.Woman,
      ESearchGender.All,
      "",
    ]),
    [EProfileEditFormFields.Location]: stringOptionalSchema,
    [EProfileEditFormFields.Description]: stringOptionalSchema,
    [EProfileEditFormFields.Height]:
      numberNonNegativeWithMaxHeightOptionalSchema,
    [EProfileEditFormFields.Weight]:
      numberNonNegativeWithMaxWeightOptionalSchema,
    [EProfileEditFormFields.LookingFor]: z.enum([
      ELookingFor.Chat,
      ELookingFor.Dates,
      ELookingFor.Relationship,
      ELookingFor.Friendship,
      ELookingFor.Business,
      ELookingFor.Sex,
      ELookingFor.All,
      "",
    ]),
    [EProfileEditFormFields.Image]: z.union([
      z.literal(null),
      fileSchema.or(fileSchema.array()),
    ]),
    [EProfileEditFormFields.TelegramUserID]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.TelegramUsername]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.TelegramFirstName]: stringOptionalSchema,
    [EProfileEditFormFields.TelegramLastName]: stringOptionalSchema,
    [EProfileEditFormFields.TelegramLanguageCode]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.TelegramAllowsWriteToPm]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.TelegramQueryId]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.TelegramChatId]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.Latitude]: numberNonNegativeOptionalSchema,
    [EProfileEditFormFields.Longitude]: numberNonNegativeOptionalSchema,
    [EProfileEditFormFields.AgeFrom]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.AgeTo]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.Distance]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.Page]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.Size]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.IsImages]: z.string().trim().nullish(),
  })
  .superRefine(({ height, isImages, image, weight }, ctx) => {
    if (
      Boolean(isImages) &&
      !isNil(image) &&
      !Array.isArray(image) &&
      image.size > MAX_FILE_SIZE
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EProfileEditFormFields.Image],
        message: FILE_MAX_SIZE_MESSAGE,
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EProfileEditFormFields.Image],
        message: EMPTY_FIELD_ERROR_MESSAGE,
      });
    }
    if (!Boolean(isImages) && isNil(image)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EProfileEditFormFields.Image],
        message: EMPTY_FIELD_ERROR_MESSAGE,
      });
    }
    if (
      !Boolean(isImages) &&
      !isNil(image) &&
      !Array.isArray(image) &&
      image.size > MAX_FILE_SIZE
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EProfileEditFormFields.Image],
        message: FILE_MAX_SIZE_MESSAGE,
      });
    }
    if (
      !isNil(height) &&
      Number(height) >= 0 &&
      Number(height) < HEIGHT_MIN_SIZE
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EProfileAddFormFields.Height],
        message: HEIGHT_MIN_SIZE_MESSAGE,
      });
    }
    if (
      !isNil(weight) &&
      Number(weight) >= 0 &&
      Number(weight) < WEIGHT_MIN_SIZE
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [EProfileAddFormFields.Weight],
        message: WEIGHT_MIN_SIZE_MESSAGE,
      });
    }
  });
