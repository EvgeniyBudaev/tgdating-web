import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "@/app/uikit/components/button/buttonLink";
import { Typography } from "@/app/uikit/components/typography";
import "./CancelButton.scss";

type TProps = {
  href: string;
};

export const CancelButton: FC<TProps> = ({ href }) => {
  const { t } = useTranslation("index");

  return (
    <ButtonLink className="CancelButton" href={href}>
      <Typography>{t("common.actions.back")}</Typography>
    </ButtonLink>
  );
};
