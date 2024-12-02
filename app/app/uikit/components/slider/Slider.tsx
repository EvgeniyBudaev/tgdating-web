"use client";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import Image from "next/image";
import type { FC } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { TImage } from "@/app/api/profile/image";
import { Icon } from "@/app/uikit/components/icon";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.scss";

type TProps = {
  images?: TImage[] | null;
};

export const Slider: FC<TProps> = ({ images }) => {
  return !isNil(images) && !isEmpty(images) ? (
    <Swiper
      className="Slider"
      modules={[Pagination]}
      pagination={{ type: "progressbar" }}
      spaceBetween={0}
      slidesPerView={1}
    >
      {(images ?? []).map((item) => {
        return (
          <SwiperSlide key={item.id}>
            <div className="Slider-WrapperImage">
              <Image
                alt={item.name}
                className="Slider-Image"
                fill={true}
                priority={true}
                sizes="100vw"
                src={item.url}
                quality={100}
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  ) : (
    <Icon type="NoImage" />
  );
};
