import { useState } from "react";
import { ETariff } from "@/app/shared/enums";

type TUseTariffResponse = {
  onChangeTariff: (tariff: ETariff) => void;
  tariff: ETariff;
};

type TUseTariff = () => TUseTariffResponse;

export const useTariff: TUseTariff = () => {
  const [tariff, setTariff] = useState<ETariff>(ETariff.Year);

  const handleChangeTariff = (tariff: ETariff) => {
    setTariff(tariff);
  };

  return {
    onChangeTariff: handleChangeTariff,
    tariff,
  };
};
