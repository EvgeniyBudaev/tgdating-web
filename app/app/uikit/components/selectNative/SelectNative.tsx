import clsx from "clsx";
import { memo, useId } from "react";
import type { FC } from "react";
import { default as ReactSelect } from "react-select";

import { Error } from "@/app/uikit/components/error";
import { StyledDropdownIndicator } from "@/app/uikit/components/selectNative/selectComponentsStyles";
import { selectNativeStyles } from "@/app/uikit/components/selectNative/selectNativeStyles";
import type { TSelectNativeProps } from "@/app/uikit/components/selectNative/types";
import { ETheme } from "@/app/uikit/enums/theme";
import { useHydrated } from "@/app/uikit/hooks";
import "./SelectNative.scss";

const SelectNativeUiComponent: FC<TSelectNativeProps> = ({
  className,
  components,
  dataTestId = "uikit__selectNative",
  defaultValue,
  errors,
  getOptionLabel,
  id,
  instanceId,
  isDisabled = false,
  isMulti = false,
  isSearchable,
  menuPlacement,
  menuPosition,
  name,
  onBlur,
  onChange,
  onFocus,
  options,
  placeholder,
  styles,
  theme = ETheme.Light,
  value,
}) => {
  const uuid = useId();
  const idSelect = id ? id : uuid;
  const instanceIdSelect = instanceId ? instanceId : uuid;
  const hydrated = useHydrated();

  return hydrated ? (
    <div className={clsx("SelectNative-Wrapper", className)}>
      <ReactSelect
        // menuIsOpen={true}
        className={clsx("SelectNative", className)}
        components={{
          DropdownIndicator: StyledDropdownIndicator,
          ...components,
        }}
        data-testid={dataTestId}
        defaultValue={defaultValue}
        getOptionLabel={getOptionLabel}
        id={idSelect}
        instanceId={instanceIdSelect}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isSearchable={isSearchable}
        menuPlacement={menuPlacement}
        menuPosition={menuPosition}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        options={options}
        placeholder={placeholder}
        styles={!styles && theme ? selectNativeStyles(theme) : styles}
        value={value}
      />
      {errors && (
        <div className="InputField-ErrorField">
          <Error errors={errors} />
        </div>
      )}
    </div>
  ) : null;
};

export const SelectNative = memo(SelectNativeUiComponent);
