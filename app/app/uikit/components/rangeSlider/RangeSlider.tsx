"use client";

import clsx from "clsx";
import {
  type ChangeEvent,
  type FC,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";
import type { TRangeSliderProps } from "@/app/uikit/components/rangeSlider/types";
import { Typography } from "@/app/uikit/components/typography";
import "./RangeSlider.scss";

const RangeSliderComponent: FC<TRangeSliderProps> = ({
  classes,
  isShowRangeValue = false,
  isShowTooltip = false,
  label,
  max,
  min,
  onChange,
  step,
  value,
}) => {
  const [minValue, setMin] = useState(value[0]);
  const [maxValue, setMax] = useState(value[1]);
  const [minTooltip, setMinTooltip] = useState(value[0]);
  const [maxTooltip, setMaxTooltip] = useState(value[1]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const minInputRef = useRef<HTMLInputElement | null>(null);
  const maxInputRef = useRef<HTMLInputElement | null>(null);
  const minTooltipRef = useRef<HTMLDivElement | null>(null);
  const maxTooltipRef = useRef<HTMLDivElement | null>(null);
  const zIndexMin = "10";
  const zIndexMax = "20";

  useEffect(() => {
    if (
      trackRef &&
      trackRef.current &&
      minTooltipRef &&
      minTooltipRef.current &&
      maxTooltipRef &&
      maxTooltipRef.current
    ) {
      const minLeft = `${((minValue - min) / (max - min)) * 100}%`;
      const maxRight = `${((max - maxValue) / (max - min)) * 100}%`;
      trackRef.current.style.left = minLeft;
      trackRef.current.style.right = maxRight;
      minTooltipRef.current.style.left = minLeft;
      minTooltipRef.current.style.transform = `translateX(-${minLeft})`;
      maxTooltipRef.current.style.right = maxRight;
      maxTooltipRef.current.style.transform = `translateX(${maxRight})`;
    }
  }, [max, maxValue, min, minValue]);

  const handleChangeMin = (event?: ChangeEvent<HTMLInputElement>) => {
    if (
      minInputRef &&
      minInputRef.current &&
      maxInputRef &&
      maxInputRef.current
    ) {
      minInputRef.current.style.zIndex = zIndexMax;
      maxInputRef.current.style.zIndex = zIndexMin;
    }
    if (
      minTooltipRef &&
      minTooltipRef.current &&
      maxTooltipRef &&
      maxTooltipRef.current
    ) {
      minTooltipRef.current.style.zIndex = zIndexMax;
      maxTooltipRef.current.style.zIndex = zIndexMin;
    }
    const value = Number(event?.target.value);
    if (value <= maxValue) {
      setMin(value);
      setMinTooltip(value);
      if (onChange) {
        onChange?.([value, maxValue]);
      }
    }
  };

  const handleChangeMax = (event?: ChangeEvent<HTMLInputElement>) => {
    if (
      minInputRef &&
      minInputRef.current &&
      maxInputRef &&
      maxInputRef.current
    ) {
      minInputRef.current.style.zIndex = zIndexMin;
      maxInputRef.current.style.zIndex = zIndexMax;
    }
    if (
      minTooltipRef &&
      minTooltipRef.current &&
      maxTooltipRef &&
      maxTooltipRef.current
    ) {
      minTooltipRef.current.style.zIndex = zIndexMin;
      maxTooltipRef.current.style.zIndex = zIndexMax;
    }
    const value = Number(event?.target.value);
    if (value >= minValue) {
      setMax(value);
      setMaxTooltip(value);
      onChange?.([minValue, value]);
    }
  };

  return (
    <div className={clsx("RangeSlider", classes?.root)}>
      <div className="RangeSlider-Info">
        <div className="RangeSlider-Title">
          <Typography>{label}</Typography>
        </div>
        {isShowRangeValue && (
          <div className="RangeSlider-NumberList">
            <div>{Array.isArray(value) && value?.[0]}</div>
            &nbsp;-&nbsp;
            <div>{Array.isArray(value) && value?.[1]}</div>
          </div>
        )}
      </div>
      <div className="RangeSlider-Slider">
        <div className="RangeSlider-Slider-Track__initial"></div>
        <div className="RangeSlider-Slider-Track" ref={trackRef}></div>
        <input
          className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Min"
          max={max}
          min={min}
          name="min"
          onChange={handleChangeMin}
          ref={minInputRef}
          step={step}
          type="range"
          value={minValue}
        />
        <input
          className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Max"
          max={max}
          min={min}
          name="max"
          onChange={handleChangeMax}
          ref={maxInputRef}
          step={step}
          type="range"
          value={maxValue}
        />
        {isShowTooltip && (
          <>
            <div
              className="RangeSlider-Slider-WapperTooltip"
              ref={minTooltipRef}
            >
              <div className="RangeSlider-Slider-Tooltip RangeSlider-Slider-Tooltip-Min">
                <Typography>{minTooltip}</Typography>
              </div>
            </div>
            <div
              className="RangeSlider-Slider-WapperTooltip"
              ref={maxTooltipRef}
            >
              <div className="RangeSlider-Slider-Tooltip RangeSlider-Slider-Tooltip-Max">
                <Typography>{maxTooltip}</Typography>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

RangeSliderComponent.displayName = "RangeSlider";

export const RangeSlider = memo(RangeSliderComponent);
