import type { ZodErrorMap } from "zod";

export type TRawCreateParams = {
  errorMap?: ZodErrorMap;
  invalid_type_error?: string;
  required_error?: string;
  description?: string;
};
