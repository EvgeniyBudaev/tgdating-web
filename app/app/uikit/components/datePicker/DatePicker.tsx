"use client";

import { memo, type FC } from "react";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DEFAULT_AGE_FROM, DEFAULT_AGE_TO } from "@/app/shared/constants";
import type { TDatePickerProps } from "@/app/uikit/components/datePicker/types";
import { DEFAULT_AGE } from "@/app/uikit/constants";

const DatePickerComponent: FC<TDatePickerProps> = (props) => {
  const { locale, onChange, value } = props;
  const currentDate = new Date();
  let initialDate = new Date();
  initialDate.setFullYear(currentDate.getFullYear() - DEFAULT_AGE);

  let initialMaxDate = new Date();
  initialMaxDate.setFullYear(currentDate.getFullYear() - DEFAULT_AGE_FROM);

  let initialMinDate = new Date();
  initialMinDate.setFullYear(currentDate.getFullYear() - DEFAULT_AGE_TO);

  return (
    <Calendar
      {...props}
      date={value ?? initialDate}
      locale={locale}
      maxDate={props?.maxDate ?? initialMaxDate}
      minDate={props?.minDate ?? initialMinDate}
      onChange={onChange}
    />
  );
};

DatePickerComponent.displayName = "DatePicker";

export const DatePicker = memo(DatePickerComponent);
