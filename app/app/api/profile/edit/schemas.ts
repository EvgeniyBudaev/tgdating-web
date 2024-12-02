import { z } from "zod";
import { zfd } from "zod-form-data";
import { fileSchema } from "@/app/api/upload/schemas";
import { imageSchema } from "@/app/api/profile/image/schemas";
import { navigatorSchema } from "@/app/api/profile/navigator/schemas";
import { filterSchema } from "@/app/api/profile/filter/schemas";
import { telegramSchema } from "@/app/api/profile/telegram/schemas";

export const editProfileParamsSchema = zfd.formData({
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
  isImages: zfd.text(),
});

export const editProfileSchema = z.object({
  telegramUserId: z.string(),
  displayName: z.string(),
  birthday: z.string(),
  gender: z.string(),
  location: z.string().nullish(),
  description: z.string().nullish(),
  height: z.number().nullish(),
  weight: z.number().nullish(),
  isFrozen: z.boolean(),
  isBlocked: z.boolean(),
  isPremium: z.boolean(),
  isShowDistance: z.boolean(),
  isInvisible: z.boolean(),
  isOnline: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string().nullish(),
  lastOnline: z.string(),
  images: imageSchema.array().nullish(),
  navigator: navigatorSchema.nullish(),
  filter: filterSchema.nullish(),
  telegram: telegramSchema.nullish(),
});
