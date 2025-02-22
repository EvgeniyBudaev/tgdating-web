"use client";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import Image from "next/image";
import { type FC, memo } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@/app/uikit/components/icon";
import type { TSliderProps } from "@/app/uikit/components/slider/types";
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.scss";

const SliderComponent: FC<TSliderProps> = ({ images }) => {
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

SliderComponent.displayName = "Slider";

export const Slider = memo(SliderComponent);
