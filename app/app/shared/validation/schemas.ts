import { z } from "zod";
import { zfd } from "zod-form-data";
import { t } from "@/app/shared/i18next";
import {
  EMPTY_FIELD_ERROR_MESSAGE,
  NUMBER_TYPE_ERROR,
} from "@/app/shared/validation/constants";
import type { TRawCreateParams } from "@/app/shared/validation/types";
import { parseFloatNumber } from "@/app/shared/utils";

const numberPreprocess = (
  value?: string | number,
): number | string | undefined => {
  if (!value) return undefined;
  const number = parseFloatNumber(value);
  if (!Number.isNaN(number) && number == value.toString().replace(",", ".")) {
    return number;
  }
  return value;
};

export const numberOptionalSchema = zfd.numeric(
  z
    .number({ invalid_type_error: t("common.validation.invalidTypeNumber") })
    .optional(),
);

const numberNonNegativeWithMaxOptionalSchema = (
  max: number,
  params?: TRawCreateParams,
) =>
  z.preprocess(
    numberPreprocess,
    z
      .number({ ...NUMBER_TYPE_ERROR, ...params })
      .nonnegative({ message: t("common.validation.nonNegativeNumber") })
      .max(max, t("common.validation.lessOrEqualMaxNumber", { max: max }))
      .optional(),
  );

const symbolsMaxSchema = (max: number, params?: TRawCreateParams) =>
  z
    .string({ ...params })
    .trim()
    .min(1, EMPTY_FIELD_ERROR_MESSAGE)
    .max(max, t("common.validation.maxSymbols", { max: max }));

export const numberNonNegativeWithMaxHeightOptionalSchema =
  numberNonNegativeWithMaxOptionalSchema(250);
export const numberNonNegativeWithMaxWeightOptionalSchema =
  numberNonNegativeWithMaxOptionalSchema(650);
export const symbolsMaxDisplayNameSchema = symbolsMaxSchema(64);
