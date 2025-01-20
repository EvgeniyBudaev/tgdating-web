"use client";

import { type FC, memo } from "react";
import { useTranslation } from "@/app/i18n/client";
import { BuyPremiumFooter } from "@/app/pages/buyPremiumPage/buyPremiumFooter";
import { BuyPremiumForm } from "@/app/pages/buyPremiumPage/buyPremiumForm";
import { BuyPremiumTitle } from "@/app/pages/buyPremiumPage/buyPremiumTitle";
import { ListImages } from "@/app/pages/buyPremiumPage/listImages";
import { ListTariffs } from "@/app/pages/buyPremiumPage/listTariffs";
import { Container } from "@/app/shared/components/container";
import { ELanguage } from "@/app/shared/enums";
import { useTariff } from "@/app/shared/hooks";
import { Modal } from "@/app/uikit/components/modal";
import { ETheme } from "@/app/uikit/enums/theme";
import "./PremiumModal.scss";

type TProps = {
  isOpenModal: boolean;
  lng: ELanguage;
  onCloseModal: () => void;
  showCloseIcon?: boolean;
  telegramUserId: string;
  theme: ETheme;
};

const PremiumModalComponent: FC<TProps> = ({
  isOpenModal,
  lng,
  onCloseModal,
  showCloseIcon = false,
  telegramUserId,
  theme,
}) => {
  const { onChangeTariff, tariff } = useTariff();
  const { t } = useTranslation("index");

  return (
    <Modal
      isOpen={isOpenModal}
      onCloseModal={onCloseModal}
      showCloseIcon={showCloseIcon}
    >
      <Modal.Content>
        <Container>
          <ListImages className="PremiumModal-ListImages" />
          <BuyPremiumTitle />
          <ListTariffs
            className="PremiumModal-ListTariffs"
            onChange={onChangeTariff}
            tariff={tariff}
            theme={theme}
          />
        </Container>
        <BuyPremiumForm
          lng={lng}
          onCancel={onCloseModal}
          tariff={tariff}
          telegramUserId={telegramUserId}
        />
        <BuyPremiumFooter lng={lng} />
      </Modal.Content>
    </Modal>
  );
};

PremiumModalComponent.displayName = "PremiumModal";

export const PremiumModal = memo(PremiumModalComponent);
