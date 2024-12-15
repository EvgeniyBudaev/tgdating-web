import { type FC, memo } from "react";
import { Container } from "@/app/shared/components/container";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import "./Info.scss";

type TProps = {
  message: string;
};

const InfoComponent: FC<TProps> = ({ message }) => {
  return (
    <div className="Info">
      <Container>
        <div className="Info-Inner">
          <div className="Info-IconWrapper">
            <Icon className="Info-Icon" type="Info" />
          </div>
          <Typography>{message}</Typography>
        </div>
      </Container>
    </div>
  );
};

InfoComponent.displayName = "Info";

export const Info = memo(InfoComponent);
