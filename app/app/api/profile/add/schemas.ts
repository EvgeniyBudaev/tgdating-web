import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload";

export const addProfileParamsSchema = zfd.formData({
  sessionId: zfd.text(),
  displayName: zfd.text(),
  birthday: zfd.text(),
  gender: zfd.text(),
  searchGender: zfd.text(),
  location: zfd.text().nullish(),
  description: zfd.text().nullish(),
  height: zfd.text().nullish(),
  weight: zfd.text().nullish(),
  lookingFor: zfd.text().nullish(),
  image: fileSchema.or(fileSchema.array()).nullish(),
  telegramUserId: zfd.text(),
  telegramUsername: zfd.text().nullish(),
  telegramFirstName: zfd.text().nullish(),
  telegramLastName: zfd.text().nullish(),
  telegramLanguageCode: zfd.text(),
  telegramAllowsWriteToPm: zfd.text(),
  telegramQueryId: zfd.text(),
  latitude: zfd.text(),
  longitude: zfd.text(),
  ageFrom: zfd.text(),
  ageTo: zfd.text(),
  distance: zfd.text(),
  page: zfd.text(),
  size: zfd.text(),
});

export const profileSchema = z.object({
  sessionId: z.string(),
});
