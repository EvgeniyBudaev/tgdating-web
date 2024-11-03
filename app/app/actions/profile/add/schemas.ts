import isEmpty from "lodash/isEmpty";
import isInteger from "lodash/isInteger";
import isNil from "lodash/isNil";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { imageFileSchema } from "@/app/api/upload";
import { EProfileAddFormFields } from "@/app/actions/profile/add/enums";
import { HEIGHT_MIN_SIZE, WEIGHT_MIN_SIZE } from "@/app/shared/constants";
import { EGender, ELookingFor, ESearchGender } from "@/app/shared/enums/form";
import {
  EMPTY_FIELD_ERROR_MESSAGE,
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

export const addProfileFormSchema = zfd
  .formData({
    [EProfileAddFormFields.SessionId]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileAddFormFields.DisplayName]: symbolsMaxDisplayNameSchema,
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
    [EProfileAddFormFields.Location]: stringOptionalSchema,
    [EProfileAddFormFields.Description]: stringOptionalSchema,
    [EProfileAddFormFields.Height]:
      numberNonNegativeWithMaxHeightOptionalSchema,
    [EProfileAddFormFields.Weight]:
      numberNonNegativeWithMaxWeightOptionalSchema,
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
    [EProfileAddFormFields.Image]: imageFileSchema,
    [EProfileAddFormFields.TelegramUserID]: z
      .string()
      .trim()
      .min(1, EMPTY_FIELD_ERROR_MESSAGE),
    [EProfileAddFormFields.TelegramUsername]: z.string().trim(),
    [EProfileAddFormFields.TelegramFirstName]: stringOptionalSchema,
    [EProfileAddFormFields.TelegramLastName]: stringOptionalSchema,
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
    [EProfileAddFormFields.Latitude]: numberNonNegativeOptionalSchema,
    [EProfileAddFormFields.Longitude]: numberNonNegativeOptionalSchema,
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
  })
  .superRefine(({ height, weight }, ctx) => {
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
