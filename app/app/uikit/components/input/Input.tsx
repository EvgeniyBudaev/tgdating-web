"use client";

import clsx from "clsx";
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
import { ETheme } from "@/app/uikit/enums/theme";
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
  errors?: string | string[] | null;
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
  theme?: ETheme;
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
      onBlur,
      onChange,
      onFocus,
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
