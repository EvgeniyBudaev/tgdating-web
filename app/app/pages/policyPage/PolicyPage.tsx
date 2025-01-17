"use client";

import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { ELanguage } from "@/app/shared/enums";

type TProps = {
  lng: ELanguage;
};

const PolicyPageComponent: FC<TProps> = ({ lng }) => {
  const { t } = useTranslation("index");

  return (
    <section className="PolicyPage">
      <div>PolicyPage</div>
    </section>
  );
};

export const PolicyPage = memo(PolicyPageComponent);
