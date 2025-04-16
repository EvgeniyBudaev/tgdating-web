"use client";

import clsx from "clsx";
import { type ChangeEvent, forwardRef, memo, useEffect, useState } from "react";
import type { ForwardedRef, FocusEvent } from "react";
import { Error } from "@/app/uikit/components/error";
import type { IInputProps } from "@/app/uikit/components/input/types";
import {
  ETypographyVariant,
  Typography,
} from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Input.scss";

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
      isReadOnly,
      label,
      maxLength,
      name,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      subLabel,
      theme,
      type,
      value,
      ...rest
    }: IInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    const [inputValue, setInputValue] = useState(defaultValue || value || "");
    const [currentLength, setCurrentLength] = useState(
      (defaultValue ?? value ?? "").toString().length ?? 0,
    );
    const [isFocused, setIsFocused] = useState<boolean | undefined>(
      isInputFocused || !!defaultValue,
    );

    useEffect(() => {
      if (defaultValue) {
        setCurrentLength((defaultValue ?? "").toString().length ?? 0);
        setIsFocused(isInputFocused || !!defaultValue);
        setInputValue(defaultValue);
      }
    }, [defaultValue, isInputFocused]);

    const onBlurCallback = (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
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
      setInputValue(value);
      onChange?.(event);
    };

    return (
      <div
        className={clsx("InputField", className, {
          ["theme-dark"]: theme === ETheme.Dark,
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
        <Typography>
          <input
            {...rest}
            aria-disabled={isReadOnly}
            autoComplete={autoComplete}
            className={clsx(className, "Input", {
              ["theme-dark"]: theme === ETheme.Dark,
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
            placeholder={placeholder}
            readOnly={isReadOnly}
            ref={ref}
            type={type}
            value={inputValue}
          />
        </Typography>

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
    );
  },
);

InputComponent.displayName = "InputComponent";

export const Input = memo(InputComponent);
