import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema, MAX_FILE_SIZE } from "@/app/api/upload";
import { EProfileEditFormFields } from "@/app/actions/profile/editProfile/enums";
import { EGender, ESearchGender } from "@/app/shared/enums/form";
import {
  EMPTY_FIELD_ERROR_MESSAGE,
  FILE_MAX_SIZE_MESSAGE,
} from "@/app/shared/validation";
import {
  numberNonNegativeOptionalSchema,
  stringOptionalSchema,
  symbolsMaxDisplayNameSchema,
} from "@/app/shared/validation/schemas";

export const editProfileFormSchema = zfd
  .formData({
    [EProfileEditFormFields.DisplayName]: symbolsMaxDisplayNameSchema,
    [EProfileEditFormFields.Age]: z.union([z.string(), z.number()]).refine(
      (value) => {
        return Number(value);
      },
      {
        message: EMPTY_FIELD_ERROR_MESSAGE,
      },
    ),
    [EProfileEditFormFields.Gender]: z
      .enum([EGender.Man, EGender.Woman, ""])
      .transform((value) => {
        return isEmpty(value) || isNil(value) ? "" : value;
      })
      .refine(
        (value) => {
          return !isEmpty(value);
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
    [EProfileEditFormFields.Description]: stringOptionalSchema,
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
    [EProfileEditFormFields.TelegramInitDataCrypt]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.CountryCode]: stringOptionalSchema,
    [EProfileEditFormFields.CountryName]: stringOptionalSchema,
    [EProfileEditFormFields.City]: stringOptionalSchema,
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
    [EProfileEditFormFields.Csrf]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileEditFormFields.IsImages]: z.string().trim().nullish(),
  })
  .superRefine(({ isImages, image }, ctx) => {
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
  });
