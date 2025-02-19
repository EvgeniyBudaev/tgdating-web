import isEmpty from "lodash/isEmpty";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { imageFileSchema } from "@/app/api/upload";
import { EProfileAddFormFields } from "@/app/actions/profile/addProfile/enums";
import { EGender, EMeasurement, ESearchGender } from "@/app/shared/enums/form";
import { EMPTY_FIELD_ERROR_MESSAGE } from "@/app/shared/validation";
import {
  numberNonNegativeOptionalSchema,
  stringOptionalSchema,
  symbolsMaxDisplayNameSchema,
} from "@/app/shared/validation/schemas";

export const addProfileFormSchema = zfd.formData({
  [EProfileAddFormFields.DisplayName]: symbolsMaxDisplayNameSchema,
  [EProfileAddFormFields.Age]: z.union([z.string(), z.number()]).refine(
    (value) => {
      return Number(value);
    },
    {
      message: EMPTY_FIELD_ERROR_MESSAGE,
    },
  ),
  [EProfileAddFormFields.Gender]: z
    .enum([EGender.Man, EGender.Woman, ""])
    .refine(
      (value) => {
        return !isEmpty(value);
      },
      {
        message: EMPTY_FIELD_ERROR_MESSAGE,
      },
    ),
  [EProfileAddFormFields.SearchGender]: z.enum([
    ESearchGender.Man,
    ESearchGender.Woman,
    ESearchGender.All,
  ]),
  [EProfileAddFormFields.Description]: stringOptionalSchema,
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
  [EProfileAddFormFields.TelegramInitDataCrypt]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
  [EProfileAddFormFields.CountryCode]: stringOptionalSchema,
  [EProfileAddFormFields.CountryName]: stringOptionalSchema,
  [EProfileAddFormFields.City]: stringOptionalSchema,
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
  [EProfileAddFormFields.IsLiked]: z.preprocess(
    (v) => (typeof v === "string" ? v === "true" : !!v),
    z.boolean(),
  ),
  [EProfileAddFormFields.IsOnline]: z.preprocess(
    (v) => (typeof v === "string" ? v === "true" : !!v),
    z.boolean(),
  ),
  [EProfileAddFormFields.IsLeftHand]: z.string(),
  [EProfileAddFormFields.Measurement]: z.enum([
    EMeasurement.Metric,
    EMeasurement.American,
  ]),
  [EProfileAddFormFields.Csrf]: z
    .string()
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE),
});
