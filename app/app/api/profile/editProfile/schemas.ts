import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload/schemas";
import { imageSchema } from "@/app/api/image/schemas";
import { navigatorSchema } from "@/app/api/navigator/updateNavigator/schemas";
import { filterSchema } from "@/app/api/filter/schemas";
import { statusSchema } from "@/app/api/status/schemas";

export const editProfileParamsSchema = zfd.formData({
  displayName: zfd.text(),
  age: zfd.text(),
  gender: zfd.text(),
  searchGender: zfd.text(),
  description: zfd.text().nullish(),
  image: fileSchema.or(fileSchema.array()).nullish(),
  telegramUserId: zfd.text(),
  telegramUsername: zfd.text().nullish(),
  telegramFirstName: zfd.text().nullish(),
  telegramLastName: zfd.text().nullish(),
  telegramLanguageCode: zfd.text(),
  telegramAllowsWriteToPm: zfd.text(),
  telegramQueryId: zfd.text(),
  countryCode: zfd.text().nullish(),
  countryName: zfd.text().nullish(),
  city: zfd.text().nullish(),
  latitude: zfd.text(),
  longitude: zfd.text(),
  ageFrom: zfd.text(),
  ageTo: zfd.text(),
  distance: zfd.text(),
  page: zfd.text(),
  size: zfd.text(),
  isImages: zfd.text(),
});

export const editProfileSchema = z.object({
  telegramUserId: z.string(),
  displayName: z.string(),
  age: z.number(),
  gender: z.string(),
  description: z.string().nullish(),
  navigator: navigatorSchema.nullish(),
  filter: filterSchema.nullish(),
  status: statusSchema.nullish(),
  images: imageSchema.array().nullish(),
});
