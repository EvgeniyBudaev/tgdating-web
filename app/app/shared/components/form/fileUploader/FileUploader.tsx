"use client";

import isEmpty from "lodash/isEmpty";
import { useCallback, useState, type FC, type ReactElement } from "react";
import { useFormStatus } from "react-dom";
import { useTranslation } from "react-i18next";
import type { DropEvent, FileRejection } from "react-dropzone";
import type { TImage } from "@/app/api/profile/image";
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
  files,
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
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState<string>();
  const minDimension = 150;

  const onDrop = useCallback(
    (addedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
      if (maxFiles && countFiles > maxFiles) return;
      const { acceptedFiles, newFiles } = filterDuplicatedFiles(
        addedFiles,
        files,
      );
      onAddFiles?.(acceptedFiles, newFiles);
      setCountFiles((prevState) => prevState + 1);
      openModal();
      // Image crop
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;
        imageElement.addEventListener("load", (event) => {
          if (error) setError("");
          const { naturalHeight, naturalWidth } = event.currentTarget;
          if (naturalWidth < minDimension || naturalHeight < minDimension) {
            const errorMessage = t("common.validation.smallImage");
            setError(errorMessage);
            return setImageSrc("");
          }
        });
        setImageSrc(imageUrl);
      });
      reader.readAsDataURL(newFiles[0]);
    },
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

  // useEffect(() => {
  //   if (isNil(files)) return;
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () =>
  //     files.forEach((file) => (file?.preview ? URL.revokeObjectURL(file.preview) : file));
  // }, [files]);

  const handleLoadImage = (file: TFile) => {
    return file?.preview ? URL.revokeObjectURL(file.preview) : file;
  };

  return (
    <div className="FileUploader">
      <Previews
        accept={accept}
        className="FileUploader-Previews"
        defaultImages={defaultImages}
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
        <Modal.Content>
          {!isEmpty(imageSrc) && (
            <ImageCropper imageSrc={imageSrc} minDimension={minDimension} />
          )}
          {error && (
            <div className="FileUploader-ImageCropper-Error">
              <Typography>{error}</Typography>
            </div>
          )}
        </Modal.Content>
      </Modal>
    </div>
  );
};
