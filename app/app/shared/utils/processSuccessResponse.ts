const CONTENT_TYPE_BLOBS = [
  "application/octet-stream",
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
  "text/csv",
  "application/excel",
  "application/pdf",
];

/**
 * Обрабатывает успешный ответ от сервера  выполнения запроса
 *
 * @param response
 */
export const processSuccessResponse = async <T>(
  response: Response,
): Promise<T> => {
  try {
    let result;
    const contentType = response?.headers.get("Content-Type");

    if (contentType && CONTENT_TYPE_BLOBS.includes(contentType)) {
      result = await response.blob();
    } else {
      result = await response.json();
    }
    return result;
  } catch (error) {
    console.error(error);
    return undefined as T;
  }
};
