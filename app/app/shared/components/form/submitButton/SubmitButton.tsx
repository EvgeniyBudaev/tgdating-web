"use client";

import { type FC } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/app/uikit/components/button";
import { Icon } from "@/app/uikit/components/icon";
import type { IconType } from "@/app/uikit/components/icon/iconType";
import { Typography } from "@/app/uikit/components/typography";
import "./SubmitButton.scss";

type TProps = {
  iconType: IconType;
  title: string;
};

export const SubmitButton: FC<TProps> = ({
  iconType,
  postfixIconSubmit,
  title,
}) => {
  const { pending } = useFormStatus();
  const { t } = useTranslation("index");
  const isLoading = pending;

  return (
    <Button
      className="SubmitButton"
      isDisabled={isLoading}
      isLoading={isLoading}
      type="submit"
    >
      {isLoading && (
        <span className="SubmitButton-Inner">
          <Typography>{t("common.actions.loading")}</Typography>
          <Icon
            className="SubmitButton-Icon SubmitButton-Loading-Icon"
            type="Spinner"
          />
        </span>
      )}
      {!isLoading && (
        <span className="SubmitButton-Inner">
          <Typography>{title}</Typography>
          <Icon
            className="SubmitButton-Icon SubmitButton-Save-Icon"
            type={iconType}
          />
        </span>
      )}
    </Button>
  );
};
