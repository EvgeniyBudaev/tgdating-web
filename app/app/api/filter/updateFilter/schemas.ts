import { z } from "zod";
import { zfd } from "zod-form-data";

export const updateFilterParamsSchema = z.object({
  telegramUserId: zfd.text(),
  searchGender: zfd.text(),
  ageFrom: zfd.text(),
  ageTo: zfd.text(),
  distance: zfd.text(),
  page: zfd.text(),
  size: zfd.text(),
  latitude: zfd.text().nullish(),
  longitude: zfd.text().nullish(),
});
