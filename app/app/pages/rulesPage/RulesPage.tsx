"use client";

import { useRouter } from "next/navigation";
import { type FC, memo } from "react";
import { Container } from "@/app/shared/components/container";
import { ELanguage } from "@/app/shared/enums";
import { Button } from "@/app/uikit/components/button";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./RulesPage.scss";

type TProps = {
  lng: ELanguage;
};

const RulesPageComponent: FC<TProps> = ({ lng }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <section className="RulesPage">
      <Container>
        <div className="RulesPage-Block">
          <Typography variant={ETypographyVariant.TextB1Bold}>
            Правила сообщества
          </Typography>
        </div>

        <div className="RulesPage-Control">
          <Button className="RulesPage-Button" onClick={handleBack}>
            <Typography>OK</Typography>
          </Button>
        </div>
      </Container>
    </section>
  );
};

RulesPageComponent.displayName = "RulesPage";

export const RulesPage = memo(RulesPageComponent);
