"use client";

import clsx from "clsx";
import Image from "next/image";
import { type FC, memo } from "react";
import { PremiumModal } from "@/app/entities/modal/premiumModal";
import { ELanguage } from "@/app/shared/enums";
import { useModalWindow } from "@/app/uikit/components/modal";
import { ETheme } from "@/app/uikit/enums/theme";
import "./BlockedListImage.scss";
import { UnblockModal } from "@/app/entities/modal/unblockModal";

type TProps = {
  blockedTelegramUserId: string;
  imageUrl: string;
  isBlur?: boolean;
  lng: ELanguage;
  telegramUserId: string;
  theme: ETheme;
};

const BlockedListImageComponent: FC<TProps> = ({
  blockedTelegramUserId,
  imageUrl,
  isBlur,
  lng,
  telegramUserId,
  theme,
}) => {
  const { closeModal, isOpenModal, openModal } = useModalWindow();

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <>
      <div
        className={clsx("BlockedListImage-WrapperImage", {
          ["BlockedListImage__isBlur"]: isBlur,
        })}
        onClick={handleOpenModal}
      >
        <Image
          alt=""
          className="BlockedListImage-Image"
          priority={true}
          height={120}
          width={150}
          src={imageUrl}
          quality={100}
        />
      </div>
      {isBlur && (
        <PremiumModal
          classes={{ modal: "BlockedListImage-Modal" }}
          isOpenModal={isOpenModal}
          lng={lng}
          onCloseModal={closeModal}
          telegramUserId={telegramUserId}
          theme={theme}
        />
      )}
      {!isBlur && (
        <UnblockModal
          blockedTelegramUserId={blockedTelegramUserId}
          isOpenModal={isOpenModal}
          lng={lng}
          onCloseModal={closeModal}
          telegramUserId={telegramUserId}
        />
      )}
    </>
  );
};

BlockedListImageComponent.displayName = "BlockedListImage";

export const BlockedListImage = memo(BlockedListImageComponent);
