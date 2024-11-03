import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { RefinementCtx, z } from "zod";
import { zfd } from "zod-form-data";
import { t } from "@/app/shared/i18next";
import {
  EMPTY_FIELD_ERROR_MESSAGE,
  NUMBER_TYPE_ERROR,
} from "@/app/shared/validation/constants";
import type { TRawCreateParams } from "@/app/shared/validation/types";
import { parseFloatNumber } from "@/app/shared/utils";

const stringPreprocess = (arg: unknown, ctx: RefinementCtx): unknown => {
  if (!arg || isEmpty(arg) || isNil(arg)) return null;
  return arg;
};

const textOptionalSchema = (params?: TRawCreateParams) =>
  z.preprocess(
    stringPreprocess,
    z
      .string({ ...params })
      .trim()
      .nullish(),
  );

export const numberOptionalSchema = zfd.numeric(
  z
    .number({ invalid_type_error: t("common.validation.invalidTypeNumber") })
    .optional(),
);

const numberPreprocess = (arg: unknown, ctx: RefinementCtx): unknown => {
  if (
    !arg ||
    (typeof arg === "string" && (arg === "undefined" || arg === "null"))
  )
    return undefined;
  const number = parseFloatNumber(arg as number | string);
  if (
    !Number.isNaN(number) &&
    number.toString() == arg.toString().replace(",", ".")
  ) {
    return number;
  }
  return arg;
};

const numberNotNegativeOptionalSchema = (params?: TRawCreateParams) =>
  z.preprocess(
    numberPreprocess,
    z
      .number({ ...NUMBER_TYPE_ERROR, ...params })
      .nonnegative({ message: t("common.validation.nonNegativeNumber") })
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
      .int(t("common.validation.mustInteger"))
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
export const numberNonNegativeOptionalSchema =
  numberNotNegativeOptionalSchema();
export const stringOptionalSchema = textOptionalSchema();
