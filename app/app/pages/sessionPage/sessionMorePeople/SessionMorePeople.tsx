"use client";

import { type FC, memo } from "react";
import { Container } from "@/app/shared/components/container";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useNavigatorQuery } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { ButtonLink } from "@/app/uikit/components/button/buttonLink";
import { Typography } from "@/app/uikit/components/typography";
import "./SessionMorePeople.scss";

type TProps = {
  lng: ELanguage;
  telegramUserId: string;
};

const SessionMorePeopleComponent: FC<TProps> = ({ lng, telegramUserId }) => {
  const { query } = useNavigatorQuery();

  return (
    <Container>
      <div className="SessionMorePeople">
        <ButtonLink
          className="SessionMorePeople-ButtonLink"
          href={createPath(
            {
              route: ERoutes.BuyPremium,
              params: { telegramUserId },
              lng,
            },
            query,
          )}
        >
          <Typography>Разблокировать больше людей</Typography>
        </ButtonLink>
      </div>
    </Container>
  );
};

export const SessionMorePeople = memo(SessionMorePeopleComponent);
