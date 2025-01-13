"use client";

import clsx from "clsx";
import { type FC, memo } from "react";
import { ETariff } from "@/app/shared/enums";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Tariff.scss";

type TProps = {
  onChange?: (tariff: ETariff) => void;
  price: string;
  tariff: ETariff;
  theme?: ETheme;
  title: string;
};

const TariffComponent: FC<TProps> = ({
  onChange,
  price,
  tariff,
  theme,
  title,
}) => {
  const handleChange = () => {
    onChange?.(tariff);
  };

  return (
    <div
      className={clsx("Tariff", { ["theme-dark"]: theme === ETheme.Dark })}
      onClick={handleChange}
    >
      <div className="Tariff-Inner">
        <div className="Tariff-Title">
          <Typography variant={ETypographyVariant.TextB2Regular}>
            {title}
          </Typography>
        </div>
        <div className="Tariff-Price">
          <Typography variant={ETypographyVariant.TextB2Bold}>
            {price}
          </Typography>
        </div>
      </div>
    </div>
  );
};

TariffComponent.displayName = "Tariff";

export const Tariff = memo(TariffComponent);
