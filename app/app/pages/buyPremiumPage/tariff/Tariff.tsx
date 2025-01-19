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
  titlePopular?: string;
  value?: ETariff;
};

const TariffComponent: FC<TProps> = ({
  onChange,
  price,
  tariff,
  theme,
  title,
  titlePopular,
  value,
}) => {
  const handleChange = () => {
    onChange?.(tariff);
  };

  return (
    <div
      className={clsx("Tariff", {
        ["Tariff__isChecked"]: value === tariff,
        ["theme-dark"]: theme === ETheme.Dark,
      })}
      onClick={handleChange}
    >
      <div className="Tariff-Inner">
        {titlePopular && (
          <div className="Tariff-Popular">
            <Typography variant={ETypographyVariant.TextB4Regular}>
              {titlePopular}
            </Typography>
          </div>
        )}
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
