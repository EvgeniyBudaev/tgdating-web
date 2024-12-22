import { type FC, memo, useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import { SidebarContent } from "@/app/shared/components/sidebarContent";
import { useFieldError } from "@/app/shared/hooks";
import {
  Select as SelectUi,
  TSelectOption,
} from "@/app/uikit/components/select";
import { ETheme } from "@/app/uikit/enums";

type TProps = {
  defaultValue?: string | number;
  headerTitle?: string | number;
  isSidebarOpen?: boolean;
  label?: string;
  name: string;
  onCloseSidebar?: () => void;
  onHeaderClick?: () => void;
  onSave?: (value?: TSelectOption) => void;
  options?: TSelectOption[];
  selectedItem?: TSelectOption;
  subLabel?: string;
  theme?: ETheme;
  title: string;
};

const SelectComponent: FC<TProps> = ({
  defaultValue,
  headerTitle,
  isSidebarOpen,
  label,
  name,
  onHeaderClick,
  onSave,
  onCloseSidebar,
  options,
  selectedItem,
  subLabel,
  theme,
  title,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: selectedItem?.value ?? defaultValue,
  });
  const fieldErrors = useFieldError({ errors: error?.message });

  const handleChange = useCallback(
    (option?: TSelectOption) => {
      if (!option) {
        return field.onChange("");
      }
      onSave?.(option);
      field.onChange(option?.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onSave],
  );

  return (
    <SelectUi
      errors={fieldErrors}
      isSidebarOpen={isSidebarOpen}
      label={label}
      name={field.name}
      subLabel={subLabel}
      headerTitle={headerTitle}
      onHeaderClick={onHeaderClick}
      onSidebarClose={onCloseSidebar}
      theme={theme}
    >
      <SidebarContent
        onSave={handleChange}
        options={options}
        onCloseSidebar={onCloseSidebar}
        selectedItem={selectedItem}
        theme={theme}
        title={title}
      />
    </SelectUi>
  );
};

SelectComponent.displayName = "Select";

export const Select = memo(SelectComponent);
