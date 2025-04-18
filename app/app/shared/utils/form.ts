import isNil from "lodash/isNil";
import pickBy from "lodash/pickBy";
import type { TParams } from "@/app/shared/types/form";

export function omitEmptyFields<T extends TParams>(fields: T): TParams {
  return pickBy<T>(fields, (field: any) => {
    if (
      isNil(field) ||
      ((typeof field === "string" || Array.isArray(field)) && !field.length)
    ) {
      return false;
    }

    return true;
  });
}
