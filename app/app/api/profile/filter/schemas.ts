import { z } from "zod";
import { zfd } from "zod-form-data";

export const filterSchema = z.object({
  telegramUserId: z.string(),
  searchGender: z.string(),
  lookingFor: z.string(),
  ageFrom: z.number(),
  ageTo: z.number(),
  distance: z.number(),
  page: z.number(),
  size: z.number(),
});

export const filterParamsSchema = z.object({
  telegramUserId: z.string(),
  latitude: z.string().nullish(),
  longitude: z.string().nullish(),
});

export const filterUpdateParamsSchema = z.object({
  telegramUserId: zfd.text(),
  searchGender: zfd.text(),
  lookingFor: zfd.text(),
  ageFrom: zfd.text(),
  ageTo: zfd.text(),
  distance: zfd.text(),
  page: zfd.text(),
  size: zfd.text(),
  latitude: zfd.text().nullish(),
  longitude: zfd.text().nullish(),
});
