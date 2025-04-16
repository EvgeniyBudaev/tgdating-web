import type { TFunction } from "i18next";
import { TranslationParamsSchema } from "@/app/shared/schemas";

export function parseTranslationParams(
  raw: string,
): Parameters<TFunction> | null {
  try {
    const data = JSON.parse(raw);
    const parsedData = TranslationParamsSchema.parse(data);
    return parsedData as Parameters<TFunction>;
  } catch (error) {
    console.error(error);
    return null;
  }
}
