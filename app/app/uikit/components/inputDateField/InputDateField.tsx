"use client";

import { Popover as UiPopover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { format } from "date-fns";
import isNil from "lodash/isNil";
import { createRef, Fragment, memo } from "react";
import type { FC } from "react";

import { FORMAT_DATE } from "@/app/uikit/constants";
import { DatePicker } from "@/app/uikit/components/datePicker";
import { Error } from "@/app/uikit/components/error";
import { InputDate } from "@/app/uikit/components/inputDate";
import type { TInputDateFieldProps } from "@/app/uikit/components/inputDateField/types";
import { POPOVER_POSITION_STYLES } from "@/app/uikit/components/popover";
import { usePopover } from "@/app/uikit/hooks";
import "./InputDateField.scss";
import "../popover/Popover.scss";

const InputDateFieldComponent: FC<TInputDateFieldProps> = (props) => {
  const {
    classes,
    errors,
    isDisabled,
    isInvalid,
    locale,
    name,
    maxDate,
    minDate,
    onChange,
    onFieldClear,
    placeholder,
    subTitle,
    title,
    value,
  } = props;
  const triggerRef = createRef<HTMLDivElement>();
  const formattedValue = !isNil(value)
    ? format(value, FORMAT_DATE, { locale })
    : null;
  const date = !isNil(value) ? value : undefined;
  const maxDateValue = !isNil(maxDate) ? maxDate : undefined;
  const minDateValue = !isNil(minDate) ? minDate : undefined;

  const {
    attributes,
    onPopperElement,
    onReferenceElement,
    popoverPosition,
    styles,
  } = usePopover({
    triggerRef,
  });

  return (
    <div
      className={clsx("InputDateField", classes?.inputDateField)}
      data-name={name}
    >
      <UiPopover className="HeadlessPopover">
        <UiPopover.Button
          className="HeadlessPopover-Button"
          ref={onReferenceElement}
        >
          <div className="HeadlessPopover-Trigger" ref={triggerRef}>
            <InputDate
              errors={errors}
              isDisabled={isDisabled}
              isInvalid={isInvalid}
              onFieldClear={onFieldClear}
              placeholder={placeholder}
              subTitle={subTitle}
              title={title}
              value={formattedValue}
            />
            {errors && (
              <div className="InputField-ErrorField">
                <Error errors={errors} />
              </div>
            )}
          </div>
        </UiPopover.Button>
        <Transition as={Fragment}>
          <UiPopover.Panel
            className={clsx(
              "HeadlessPopover-Panel",
              `HeadlessPopover-Panel__${POPOVER_POSITION_STYLES[popoverPosition]}`,
            )}
            ref={onPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {({ close }) => (
              <Transition.Child
                as={Fragment}
                enter="HeadlessPopover-Transition__enter"
                enterFrom="HeadlessPopover-Transition__enterFrom"
                enterTo="HeadlessPopover-Transition__enterTo"
                leave="HeadlessPopover-Transition__leave"
                leaveFrom="HeadlessPopover-Transition__leaveFrom"
                leaveTo="HeadlessPopover-Transition__leaveTo"
              >
                <div className="HeadlessPopover-PanelContent">
                  <DatePicker
                    locale={locale}
                    maxDate={maxDateValue}
                    minDate={minDateValue}
                    onChange={(date: Date) => {
                      onChange(date);
                      close();
                    }}
                    value={date}
                  />
                </div>
              </Transition.Child>
            )}
          </UiPopover.Panel>
        </Transition>
      </UiPopover>
    </div>
  );
};

InputDateFieldComponent.displayName = "InputDateField";

export const InputDateField = memo(InputDateFieldComponent);
