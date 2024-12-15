"use client";

import { type FC, memo } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/app/uikit/components/button";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./SubmitButton.scss";

const SubmitButtonComponent: FC = () => {
  const { pending } = useFormStatus();
  const { t } = useTranslation("index");

  return (
    <Button className="SubmitButton" isLoading={pending} type="submit">
      {pending && (
        <span className="SubmitButton-Loading">
          <Typography>{t("common.actions.loading")}</Typography>
          <Icon className="SubmitButton-Loading-Icon" type="Spinner" />
        </span>
      )}
      {!pending && <Typography>{t("common.actions.save")}</Typography>}
    </Button>
  );
};

export const SubmitButton = memo(SubmitButtonComponent);
