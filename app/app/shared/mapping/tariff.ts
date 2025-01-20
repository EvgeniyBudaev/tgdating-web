import { ETariff } from "@/app/shared/enums";
import { ECurrency } from "@/app/shared/enums/currency";

const tariffFree = {
  name: ETariff.Free,
  price: "0",
  currency: ECurrency.USD,
};

const tariffMonth = {
  name: ETariff.Month,
  price: "3",
  currency: ECurrency.USD,
};

const tariffThreeMonths = {
  name: ETariff.ThreeMonths,
  price: "2",
  currency: ECurrency.USD,
};

const tariffYear = { name: ETariff.Year, price: "1", currency: ECurrency.USD };

export const TARIFF_MAPPING = new Map([
  [ETariff.Free, tariffFree],
  [ETariff.Month, tariffMonth],
  [ETariff.ThreeMonths, tariffThreeMonths],
  [ETariff.Year, tariffYear],
]);
