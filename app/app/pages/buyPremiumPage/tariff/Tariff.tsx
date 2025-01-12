"use client";

import { type FC, memo } from "react";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./Tariff.scss";

type TProps = {
  onClick?: () => void;
  price: string;
  title: string;
};

const TariffComponent: FC<TProps> = ({ onClick, price, title }) => {
  return (
    <div className="Tariff" onClick={onClick}>
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
