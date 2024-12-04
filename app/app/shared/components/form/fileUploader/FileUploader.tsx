"use client";

import isNil from "lodash/isNil";
import {
  useCallback,
  useState,
  type FC,
  type ReactElement,
  useEffect,
} from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import type { DropEvent, FileRejection } from "react-dropzone";
import type { TImage } from "../../../../api/image";
import { Previews } from "@/app/shared/components/form/fileUploader/previews";
import {
  filterDuplicatedFiles,
  getTypes,
} from "@/app/shared/components/form/fileUploader/utils";
import type { TFile } from "@/app/shared/types/file";
import { type TDropzoneProps } from "@/app/uikit/components/dropzone/Dropzone";
import { ImageCropper } from "@/app/uikit/components/imageCropper";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";
import "./FileUploader.scss";

export type TFileUploaderProps = {
  defaultImages?: TImage[];
  errors?: string | string[] | null;
  files?: TFile[];
  Input?: ReactElement;
  isLoading?: boolean;
  lng: string;
  maxFiles?: number;
  multiple?: boolean;
  onAddFile?: (file: File) => void;
  onAddFiles?: (acceptedFiles: TFile[], files: TFile[]) => void;
  onDeleteFile?: (deletedFile: TFile, files: TFile[]) => void;
  type: string;
} & TDropzoneProps;

export const FileUploader: FC<TFileUploaderProps> = ({
  accept,
  defaultImages,
  errors,
  files = [],
  Input,
  isLoading,
  lng,
  maxFiles,
  multiple = false,
  onAddFile,
  onAddFiles,
  onDeleteFile,
  ...rest
}) => {
  const { pending } = useFormStatus();
  const { t } = useTranslation("index");
  const types = getTypes(accept);
  const [countFiles, setCountFiles] = useState(1);
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const [errorImageCropper, setErrorImageCropper] = useState<
    string | undefined
  >();
  const [acceptedFiles, setAcceptedFiles] = useState<TFile[]>([]);
  const [cropFile, setCropFile] = useState<TFile | undefined>();

  useEffect(() => {
    if (cropFile && acceptedFiles.length) {
      const isExistFiles = (files ?? []).some(
        (file) => file.name === cropFile.name,
      );
      const isExistImages = (defaultImages ?? []).some(
        (file) => file.name === cropFile.name,
      );
      const isDuplicatedFile = isExistFiles || isExistImages;
      if (isDuplicatedFile) {
        return;
      }
      onAddFiles?.([cropFile], files);
      setCountFiles((prevState) => prevState + 1);
      setCropFile(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropFile, acceptedFiles, files]);

  const onDrop = useCallback(
    (addedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      if (maxFiles && countFiles > maxFiles) return;
      const { acceptedFiles } = filterDuplicatedFiles(addedFiles, files);
      setAcceptedFiles(acceptedFiles);
      openModal();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countFiles, files, maxFiles, onAddFiles],
  );

  const onDelete = useCallback(
    (deletedFile: TFile) => {
      if (files) {
        let newFiles = [...files];
        newFiles = newFiles.filter((file) => file !== deletedFile);
        onDeleteFile?.(deletedFile, newFiles);
        setCountFiles((prevState) => prevState - 1);
      }
    },
    [onDeleteFile, files],
  );

  useEffect(() => {
    if (isNil(files)) return;
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file) =>
        file?.preview ? URL.revokeObjectURL(file.preview) : file,
      );
  }, [files]);

  const handleLoadImage = (file: TFile) => {
    return file?.preview ? URL.revokeObjectURL(file.preview) : file;
  };

  const handleCropFile = (file: TFile) => {
    setCropFile(file);
    closeModal();
  };

  return (
    <div className="FileUploader" data-name={rest.name}>
      <Previews
        accept={accept}
        className="FileUploader-Previews"
        defaultImages={defaultImages}
        errors={errors}
        files={files}
        isLoading={isLoading ?? pending}
        lng={lng}
        maxFiles={maxFiles}
        multiple={multiple}
        onAddFile={onAddFile}
        onDeleteFile={onDelete}
        onDrop={onDrop}
        onLoad={handleLoadImage}
        {...rest}
      />
      <Modal isOpen={isOpenModal} onCloseModal={closeModal}>
        {acceptedFiles?.[0] && (
          <ImageCropper
            error={errorImageCropper}
            file={acceptedFiles?.[0]}
            onCancel={closeModal}
            onCropFile={handleCropFile}
            onError={setErrorImageCropper}
          />
        )}
        {errorImageCropper && (
          <div className="FileUploader-ImageCropper-Error">
            <Typography>{errorImageCropper}</Typography>
          </div>
        )}
      </Modal>
    </div>
  );
};
