"use client";

import isFunction from "lodash/isFunction";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { ChangeEventHandler, FC } from "react";
// https://github.com/mona-health/react-input-mask
import ReactInputMask from "@mona-health/react-input-mask";
import type {
  BeforeMaskedStateChangeStates,
  InputState,
} from "react-input-mask";
import { Input as InputUi } from "@/app/uikit/components/input";
import { IInputProps as TInputPropsUi } from "@/app/uikit/components/input/Input";

export type TInputMaskProps = TInputPropsUi & {
  alwaysShowMask?: boolean;
  beforeMaskedStateChange?: (
    state: BeforeMaskedStateChangeStates,
  ) => InputState;
  defaultValue?: string | number | readonly string[];
  isDisabled?: boolean;
  name: string;
  normalize?: (value: string) => string;
  mask: string | (RegExp | string)[];
  maskPlaceholder?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  title?: string;
};

const InputMaskComponent: FC<TInputMaskProps> = (props) => {
  const {
    alwaysShowMask,
    beforeMaskedStateChange,
    defaultValue = "",
    isDisabled = false,
    normalize,
    mask,
    maskPlaceholder,
    onChange,
    title,
    ...rest
  } = props;
  const [showChild, setShowChild] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (isFunction(normalize)) {
        event.target.value = normalize(event.target.value);
      }

      if (isFunction(onChange)) {
        onChange(event.target.value);
      }
    },
    [normalize, onChange],
  );

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return null;
  }

  return (
    <ReactInputMask
      alwaysShowMask={alwaysShowMask}
      beforeMaskedStateChange={beforeMaskedStateChange}
      defaultValue={defaultValue}
      mask={mask}
      maskPlaceholder={maskPlaceholder}
      onChange={handleChange}
    >
      <InputUi
        {...rest}
        defaultValue={defaultValue}
        isDisabled={isDisabled}
        isFocused={!!defaultValue}
        ref={inputRef}
      />
    </ReactInputMask>
  );
};

export const InputMask = memo(InputMaskComponent);
