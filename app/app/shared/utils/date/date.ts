import isNil from "lodash/isNil";

const isISO8601 = (str: string) => {
  const pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  return pattern.test(str);
};

// export const formattedDate = (value?: Date | null): string | undefined => {
//   if (isNil(value)) return undefined;
//   return isISO8601(value.toString()) ? value.toString() : value.toISOString();
// };

export const formattedDate = (
  value?: Date | number | string | null,
): string | undefined => {
  if (isNil(value)) return undefined;

  if (typeof value === "string") {
    // Если значение - строка, проверяем, является ли оно форматом ISO 8601
    return isISO8601(value) ? value : new Date(value).toISOString();
  }

  if (typeof value === "number" || value instanceof Date) {
    // Если значение - число или объект Date, преобразуем его в строку ISO 8601
    const day = new Date(value).getDate();
    const month = new Date(value).getMonth() + 1;
    const year = new Date(value).getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return new Date(formattedDate).toISOString();
  }

  // Если значение не является ни строкой, ни числом, ни объектом Date, возвращаем undefined
  return undefined;
};
