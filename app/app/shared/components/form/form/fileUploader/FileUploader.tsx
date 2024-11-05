"use client";

import { type FC, memo, useCallback } from "react";
import { useController, useFormContext } from "react-hook-form";
import type { TImage } from "@/app/api/profile/image";
import { Container } from "@/app/shared/components/container";
import { FileUploader as FileUploaderUi } from "@/app/shared/components/form/fileUploader";
import { ELanguage } from "@/app/shared/enums";
import { useFieldError } from "@/app/shared/hooks";
import type { TFile } from "@/app/shared/types/file";
import type { TDropzoneProps } from "@/app/uikit/components/dropzone/Dropzone";
import { Error } from "@/app/uikit/components/error";

type TProps = {
  defaultImages?: TImage[];
  files?: TFile[];
  lng: ELanguage;
  maxFiles?: number;
  multiple?: boolean;
  name: string;
  onAddFiles?: (acceptedFiles: TFile[], files: TFile[]) => void;
  onDeleteFile?: (deletedFile: TFile, files: TFile[]) => void;
  type: string;
} & TDropzoneProps;

const FileUploaderComponent: FC<TProps> = ({
  accept,
  defaultImages,
  files = [],
  lng,
  maxFiles,
  multiple = false,
  name,
  onAddFiles,
  onDeleteFile,
  type,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: files[0],
  });
  const fieldErrors = useFieldError({ errors: error?.message });

  const handleAddFiles = useCallback(
    (acceptedFiles: TFile[], fileList: TFile[]) => {
      field.onChange(acceptedFiles[0]);
      onAddFiles?.(acceptedFiles, fileList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onAddFiles],
  );

  const handleDeleteFile = useCallback(
    (deletedFile: TFile, fileList: TFile[]) => {
      if (files.length <= 1) {
        field.onChange(null);
      } else {
        field.onChange(files[files.length - 2]);
      }
      onDeleteFile?.(deletedFile, fileList);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files, onDeleteFile],
  );

  return (
    <>
      <FileUploaderUi
        accept={accept}
        defaultImages={defaultImages}
        errors={fieldErrors}
        files={files}
        lng={lng}
        maxFiles={maxFiles}
        multiple={multiple}
        name={name}
        onAddFiles={handleAddFiles}
        onDeleteFile={handleDeleteFile}
        type={type}
      />
      {fieldErrors && (
        <Container>
          <div className="InputField-ErrorField">
            <Error errors={fieldErrors} />
          </div>
        </Container>
      )}
    </>
  );
};

FileUploaderComponent.displayName = "FileUploader";

export const FileUploader = memo(FileUploaderComponent);
