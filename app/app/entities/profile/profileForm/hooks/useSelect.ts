import isNil from "lodash/isNil";
import { useEffect, useState } from "react";
import type { SingleValue } from "react-select";
import { DEFAULT_AGE_FROM } from "@/app/shared/constants";
import type {
  TSelectNativeOnChange,
  TSelectNativeOption,
} from "@/app/uikit/components/selectNative/types";

type TProps = {
  defaultSelectedOption?: SingleValue<TSelectNativeOption>;
};

type TUseSelectResponse = {
  isSelectOpened: boolean;
  onBlur: () => void;
  onChange: TSelectNativeOnChange;
  onFocus: () => void;
  options: TSelectNativeOption[];
  selectedOption: TSelectNativeOption | null;
};

type TUseSelect = (props: TProps) => TUseSelectResponse;

export const useSelect: TUseSelect = (props) => {
  const options: TSelectNativeOption[] = Array.from({ length: 83 }, (_, i) => ({
    value: DEFAULT_AGE_FROM + i,
    label: (DEFAULT_AGE_FROM + i).toString(),
  }));
  const defaultSelectedOption = props?.defaultSelectedOption ?? null;

  const [isSelectOpened, setIsSelectOpened] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedOption, setSelectedOption] = useState<
    SingleValue<TSelectNativeOption>>(defaultSelectedOption);

  const handleChange: TSelectNativeOnChange = (selectedOption) => {
    if (isNil(selectedOption)) return undefined;
    const selectedOptionSingle = selectedOption as TSelectNativeOption;
    setSelectedOption(selectedOptionSingle);
    setIsSubmitting((prevState) => !prevState);
  };

  const handleBlur = () => {
    setIsSelectOpened(false);
  };

  const handleFocus = () => {
    setIsSelectOpened(true);
  };

  useEffect(() => {
    if (!isSubmitting) return;
    setIsSubmitting((prevState) => !prevState);
  }, [isSubmitting, setIsSubmitting]);

  return {
    isSelectOpened,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    options,
    selectedOption,
  };
};
