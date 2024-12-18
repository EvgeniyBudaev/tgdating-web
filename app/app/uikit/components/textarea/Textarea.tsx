"use client";

import clsx from "clsx";
import { forwardRef, memo, useState } from "react";
import type {
  ChangeEvent,
  DetailedHTMLProps,
  ForwardedRef,
  HTMLAttributes,
  FocusEvent,
} from "react";
import { Error } from "@/app/uikit/components/error";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums";
import "../input/Input.scss";

type TClasses = {
  textarea?: string;
};

export interface ITextareaProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  autoComplete?: string;
  classes?: TClasses;
  className?: string;
  dataTestId?: string;
  defaultValue?: string;
  errors?: string | string[] | null;
  hidden?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
  isResize?: boolean;
  isRequired?: boolean;
  label?: string;
  name?: string;
  maxLength?: number;
  theme?: ETheme;
  type?: string;
  value?: string;
}

const TextareaComponent = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (
    {
      autoComplete,
      classes,
      className,
      dataTestId = "uikit__textarea",
      defaultValue,
      errors,
      hidden,
      isFocused: isInputFocused,
      isReadOnly,
      isResize,
      isRequired,
      label,
      name,
      maxLength,
      theme,
      type,
      onBlur,
      onChange,
      onFocus,
      ...rest
    }: ITextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ): JSX.Element => {
    const [currentLength, setCurrentLength] = useState(
      defaultValue?.length ?? 0,
    );
    const [isFocused, setIsFocused] = useState<boolean | undefined>(
      isInputFocused || !!defaultValue,
    );

    const onBlurCallback = (event: FocusEvent<HTMLTextAreaElement>) => {
      if (event.target.value !== "") {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }

      if (onBlur) {
        onBlur(event);
      }
    };

    const onFocusCallback = (event: FocusEvent<HTMLTextAreaElement>) => {
      if (!isFocused) {
        setIsFocused(true);
      }

      if (onFocus) {
        onFocus(event);
      }
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentLength(event.target.value.length);
      onChange?.(event);
    };

    return (
      <div
        className={clsx("InputField", className, {
          ["theme-dark"]: theme === ETheme.Dark,
          InputField__active: isFocused && !isReadOnly,
        })}
        data-testid={dataTestId}
      >
        {label && (
          <label className="InputField-Label" data-name={name} htmlFor={name}>
            <Typography>{label}</Typography>
            {isRequired && <span className="InputField-LabelRequired"> *</span>}
          </label>
        )}
        <textarea
          {...rest}
          autoComplete={autoComplete}
          className={clsx(className, classes?.textarea, "Input Textarea", {
            ["theme-dark"]: theme === ETheme.Dark,
            Input__active: isFocused,
            Textarea__isResize__off: !isResize,
          })}
          defaultValue={defaultValue}
          hidden={hidden}
          name={name}
          maxLength={maxLength}
          onBlur={onBlurCallback}
          onChange={handleChange}
          onFocus={onFocusCallback}
          ref={ref}
        />
        {maxLength && (
          <div className="Textarea-MaxLength">
            {currentLength}/{maxLength}
          </div>
        )}
        {errors && (
          <div className="InputField-ErrorField">
            <Error errors={errors}/>
          </div>
        )}
      </div>
    );
  },
);

TextareaComponent.displayName = "TextareaComponent";

export const Textarea = memo(TextareaComponent);
