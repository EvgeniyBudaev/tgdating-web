"use client";

import clsx from "clsx";
import isNaN from "lodash/isNaN";
import { ChangeEvent, forwardRef, memo, useEffect, useState } from "react";
import type {
  DetailedHTMLProps,
  ForwardedRef,
  HTMLAttributes,
  FocusEvent,
} from "react";
import { Error } from "@/app/uikit/components/error";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import "./Input.scss";

export interface IInputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  autoComplete?: string;
  className?: string;
  defaultValue?: string | number;
  dataTestId?: string;
  errors?: string | string[];
  hidden?: boolean;
  isDisabled?: boolean;
  isFocused?: boolean;
  isHiddenViewing?: boolean;
  isNumeric?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  label?: string;
  maxLength?: number;
  name?: string;
  subLabel?: string;
  type?: string;
  value?: string;
}

const InputComponent = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      autoComplete,
      className,
      dataTestId = "uikit__input",
      defaultValue,
      errors,
      hidden,
      isDisabled = false,
      isFocused: isInputFocused,
      isNumeric = false,
      isReadOnly,
      label,
      maxLength,
      name,
      subLabel,
      type,
      onBlur,
      onChange,
      onFocus,
      ...rest
    }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const [currentLength, setCurrentLength] = useState(
      (defaultValue ?? "").toString().length ?? 0,
    );
    const [currentInputValue, setCurrentInputValue] = useState(
      defaultValue ?? "",
    );
    const [isFocused, setIsFocused] = useState<boolean | undefined>(
      isInputFocused || !!defaultValue,
    );

    useEffect(() => {
      if (defaultValue) {
        setCurrentLength((defaultValue ?? "").toString().length ?? 0);
        setCurrentInputValue(defaultValue);
        setIsFocused(isInputFocused || !!defaultValue);
      }
    }, [defaultValue, isInputFocused]);

    const onBlurCallback = (event: FocusEvent<HTMLInputElement>) => {
      if (event.target.value !== "") {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    };

    const onFocusCallback = (event: FocusEvent<HTMLInputElement>) => {
      if (!isFocused) {
        setIsFocused(true);
      }
      if (onFocus) {
        onFocus(event);
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setCurrentLength(value.length);
      if (isNumeric && !isNaN(Number(value))) {
        const valueNumeric = value.replace(",", ".");
        const roundedValue = Math.floor(Number(valueNumeric));
        setCurrentInputValue(roundedValue);
      } else if (isNumeric && isNaN(Number(value))) {
        return;
      } else {
        setCurrentInputValue(value);
      }
      onChange?.(event);
    };

    return (
      <div
        className={clsx("InputField", className, {
          InputField__disabled: isReadOnly || isDisabled,
          InputField__active: isFocused && !isReadOnly && !isDisabled,
        })}
        data-testid={dataTestId}
      >
        {label && (
          <label className="InputField-Label" data-name={name} htmlFor={name}>
            <Typography>
              {label}
              {subLabel && (
                <Typography variant={ETypographyVariant.TextB4Regular}>
                  &nbsp;({subLabel})
                </Typography>
              )}
            </Typography>
          </label>
        )}
        <div className="InputField-Wrapper">
          <div
            className={clsx("InputField-Inner", {
              ["InputField-Inner__disabled"]: isReadOnly || isDisabled,
              ["InputField-Inner__active"]: isFocused,
              ["InputField-Inner__error"]: errors,
            })}
          >
            <input
              {...rest}
              aria-disabled={isReadOnly}
              autoComplete={autoComplete}
              className={clsx(className, "Input", {
                Input__disabled: isReadOnly || isDisabled,
                Input__active: isFocused && !isReadOnly && !isDisabled,
                Input__error: errors,
              })}
              disabled={isDisabled}
              hidden={hidden}
              maxLength={maxLength}
              name={name}
              onBlur={onBlurCallback}
              onChange={handleChange}
              onFocus={onFocusCallback}
              readOnly={isReadOnly}
              ref={ref}
              type={type}
              value={currentInputValue}
            />
          </div>
          {maxLength && (
            <div className="Textarea-MaxLength">
              {currentLength}/{maxLength}
            </div>
          )}
          {errors && (
            <div className="InputField-ErrorField">
              <Error errors={errors} />
            </div>
          )}
        </div>
      </div>
    );
  },
);

InputComponent.displayName = "InputComponent";

export const Input = memo(InputComponent);
