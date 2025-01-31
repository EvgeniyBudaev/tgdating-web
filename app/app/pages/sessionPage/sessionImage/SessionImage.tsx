"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FC, memo } from "react";
import type { TProfileListItem } from "@/app/api/profile/getProfileList/types";
import { PremiumModal } from "@/app/entities/modal/premiumModal";
import { CITY, COUNTRY_CODE, COUNTRY_NAME } from "@/app/shared/constants";
import { useNavigatorContext } from "@/app/shared/context";
import { ELanguage, ERoutes } from "@/app/shared/enums";
import { useScrollPosition } from "@/app/shared/hooks";
import { createPath } from "@/app/shared/utils";
import { Distance } from "@/app/uikit/components/distance";
import { Heart } from "@/app/uikit/components/heart";
import { useModalWindow } from "@/app/uikit/components/modal";
import { Online } from "@/app/uikit/components/online";
import { ETheme } from "@/app/uikit/enums/theme";
import "./SessionImage.scss";

type TProps = {
  distance?: string;
  image: TProfileListItem;
  isBlur?: boolean;
  lng: ELanguage;
  telegramUserId: string;
  theme: ETheme;
  viewedTelegramUserId: string;
};

const SessionImageComponent: FC<TProps> = ({
  distance,
  image,
  isBlur = false,
  lng,
  telegramUserId,
  theme,
  viewedTelegramUserId,
}) => {
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const navigator = useNavigatorContext();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const { saveScrollPosition } = useScrollPosition();
  const countryCode = navigator?.countryCode ?? params.get(COUNTRY_CODE);
  const countryName = navigator?.countryName ?? params.get(COUNTRY_NAME);
  const city = navigator?.city ?? params.get(CITY);

  const handleOpenModal = () => {
    isBlur && openModal();
  };

  const renderImage = ({ isBlur }: { isBlur: boolean }) => {
    return (
      <div
        className={clsx("SessionImage-WrapperImage", {
          ["SessionImage__isBlur"]: isBlur,
        })}
        onClick={handleOpenModal}
      >
        <Online
          classes={{ root: "SessionImage-Online" }}
          isOnline={image.isOnline}
        />
        <Heart isLiked={image.isLiked} />
        <Distance distance={distance} theme={theme} />
        <Image
          alt=""
          className="SessionImage-Image"
          priority={true}
          height={120}
          width={150}
          src={image.url}
          quality={100}
        />
      </div>
    );
  };

  return !isBlur ? (
    <Link
      href={{
        pathname: createPath({
          route: ERoutes.ProfileDetail,
          params: {
            telegramUserId: telegramUserId,
            viewedTelegramUserId: viewedTelegramUserId,
          },
          lng: lng,
        }),
        query: {
          ...(navigator?.latitude
            ? { latitude: navigator?.latitude.toString() }
            : {}),
          ...(navigator?.longitude
            ? { longitude: navigator?.longitude.toString() }
            : {}),
          countryCode,
          countryName,
          city,
        },
      }}
      key={telegramUserId}
      onClick={saveScrollPosition}
    >
      {renderImage({ isBlur })}
    </Link>
  ) : (
    <>
      {renderImage({ isBlur })}
      <PremiumModal
        isOpenModal={isOpenModal}
        lng={lng}
        onCloseModal={closeModal}
        telegramUserId={telegramUserId}
        theme={theme}
      />
    </>
  );
};

SessionImageComponent.displayName = "SessionImage";

export const SessionImage = memo(SessionImageComponent);
