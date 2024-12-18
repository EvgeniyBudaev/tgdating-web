import clsx from "clsx";
import { components } from "react-select";
import type {
  DropdownIndicatorProps,
  GroupBase,
  MultiValueRemoveProps,
} from "react-select";
import { Icon } from "@/app/uikit/components/icon";
import type { TSelectOption } from "@/app/uikit/components/select";

export const StyledDropdownIndicator = (
  props: JSX.IntrinsicAttributes &
    DropdownIndicatorProps<TSelectOption, boolean, GroupBase<TSelectOption>>,
) => {
  const menuIsOpen = props.selectProps.menuIsOpen;
  return (
    <div className="SelectNative-DropdownIndicator">
      <components.DropdownIndicator {...props}>
        <Icon
          className={clsx("SelectNative-IconDropdownIndicator", {
            ["SelectNative-IconDropdownIndicator__open"]: menuIsOpen,
          })}
          type="ArrowDown"
        />
      </components.DropdownIndicator>
    </div>
  );
};

export const StyledMultiValueRemove = (
  props: JSX.IntrinsicAttributes &
    MultiValueRemoveProps<TSelectOption[], boolean, GroupBase<TSelectOption[]>>,
) => {
  return (
    <div className="SelectNative-MultiValueRemove">
      <components.MultiValueRemove {...props}>
        <Icon type="Close" />
      </components.MultiValueRemove>
    </div>
  );
};
