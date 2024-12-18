"use client";

import clsx from "clsx";
import { memo } from "react";
import type { FC, ReactNode } from "react";
import { useDropzone } from "react-dropzone";
import type { DropzoneOptions } from "react-dropzone";
import { ETheme } from "@/app/uikit/enums";
import "./Dropzone.scss";

export type TDropzoneProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  errors?: string | string[] | null;
  name: string;
  multiple: boolean;
  theme?: ETheme;
} & DropzoneOptions;

const DropzoneComponent: FC<TDropzoneProps> = ({
  children,
  className,
  dataTestId = "uikit__dropzone",
  errors,
  name,
  multiple,
  onDrop,
  theme,
  ...rest
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    ...rest,
  });

  return (
    <div
      {...getRootProps()}
      className={clsx("Dropzone", className, {
        ["theme-dark"]: theme === ETheme.Dark,
        Dropzone__isDragActive: isDragActive,
        Dropzone__isError: errors,
      })}
      data-testid={dataTestId}
    >
      <input {...getInputProps()} name={name} />
      {children}
    </div>
  );
};

DropzoneComponent.displayName = "Dropzone";

export const Dropzone = memo(DropzoneComponent);
