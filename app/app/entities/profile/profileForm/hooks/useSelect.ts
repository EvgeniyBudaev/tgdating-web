import isNil from "lodash/isNil";
import { useEffect, useState } from "react";
import type { MultiValue, SingleValue } from "react-select";
import { DEFAULT_AGE_FROM } from "@/app/shared/constants";
import type {
  TSelectNativeOnChange,
  TSelectNativeOption,
} from "@/app/uikit/components/selectNative/types";

type TProps = {
  defaultSelectedOption?:
    | SingleValue<TSelectNativeOption>
    | MultiValue<TSelectNativeOption>;
};

type TUseSelectResponse = {
  isSelectOpened: boolean;
  multipleSelectedOption: TSelectNativeOption | null | TSelectNativeOption[];
  onBlur: () => void;
  onChange: TSelectNativeOnChange;
  onFocus: () => void;
  options: TSelectNativeOption[];
  selectedOption: TSelectNativeOption | null | TSelectNativeOption[];
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
    SingleValue<TSelectNativeOption> | MultiValue<TSelectNativeOption>
  >(defaultSelectedOption);

  const [multipleSelectedOption, setMultipleSelectedOption] = useState<
    SingleValue<TSelectNativeOption> | MultiValue<TSelectNativeOption>
  >({ value: DEFAULT_AGE_FROM, label: DEFAULT_AGE_FROM.toString() });

  const handleChange: TSelectNativeOnChange = (selectedOption) => {
    if (isNil(selectedOption)) return undefined;
    if (Array.isArray(selectedOption)) {
      setMultipleSelectedOption(selectedOption); // onSortingChange?.(selectedOption[0].value);
    } else {
      const selectedOptionSingle = selectedOption as TSelectNativeOption;
      setSelectedOption(selectedOptionSingle); // onSortingChange?.(selectedOptionSingle.value);
    }
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
    multipleSelectedOption,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    options,
    selectedOption,
  };
};
