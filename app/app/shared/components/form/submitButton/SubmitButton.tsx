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
  const isLoading = pending;
  return (
    <Button className="SubmitButton" isDisabled={isLoading} isLoading={isLoading} type="submit">
      {isLoading && (
        <span className="SubmitButton-Loading">
          <Typography>{t("common.actions.loading")}</Typography>
          <Icon className="SubmitButton-Loading-Icon" type="Spinner" />
        </span>
      )}
      {!isLoading && <Typography>{t("common.actions.save")}</Typography>}
    </Button>
  );
};

export const SubmitButton = memo(SubmitButtonComponent);
