import type { TFunction } from "i18next";
import { parseTranslationParams } from "./parseTranslationParams";

export function translateRawData(t: TFunction, raw: string): string {
  const translationParams = parseTranslationParams(raw);

  if (!translationParams) {
    return t(raw as any);
  }

  return t(...translationParams);
}
