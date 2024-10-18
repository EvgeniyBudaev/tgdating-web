function stringifyTranslationParams(...params: unknown[]): string {
  return JSON.stringify(params);
}

export const t = stringifyTranslationParams;
