"use client";

import { heicTo } from "heic-to/csp";
import isNil from "lodash/isNil";
import {
  useCallback,
  useState,
  type FC,
  type ReactElement,
  useEffect,
  memo,
} from "react";
import { useFormStatus } from "react-dom";

import type { TImage } from "@/app/api/image";
import { Previews } from "@/app/shared/components/form/fileUploader/previews";
import {
  filterDuplicatedFiles,
  // getTypes,
} from "@/app/shared/components/form/fileUploader/utils";
import type { TFile } from "@/app/shared/types/file";
import type { TDropzoneProps } from "@/app/uikit/components/dropzone/types";
import { Icon } from "@/app/uikit/components/icon";
import { ImageCropper } from "@/app/uikit/components/imageCropper";
import { Modal, useModalWindow } from "@/app/uikit/components/modal";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
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
  theme?: ETheme;
  type: string;
} & TDropzoneProps;

const FileUploaderComponent: FC<TFileUploaderProps> = ({
  accept,
  defaultImages,
  errors,
  files = [],
  isLoading,
  lng,
  maxFiles,
  multiple = false,
  onAddFile,
  onAddFiles,
  onDeleteFile,
  theme,
  ...rest
}) => {
  const { pending } = useFormStatus();
  // const types = getTypes(accept);
  const [countFiles, setCountFiles] = useState(1);
  const { closeModal, isOpenModal, openModal } = useModalWindow();
  const [errorImageCropper, setErrorImageCropper] = useState<
    string | undefined
  >();
  const [acceptedFiles, setAcceptedFiles] = useState<TFile[]>([]);
  const [cropFile, setCropFile] = useState<TFile | undefined>();
  const [isConvertImage, setIsConvertImage] = useState(false);

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

  const handleConvertToJPEG = (
    file: any,
    blob: Blob,
    fileType: string,
  ): TFile => {
    const fileName = file.name;
    const newFileName = fileName.replace(/\.[^/.]+$/, ".jpeg");
    const newFile: TFile = new File([blob], newFileName, {
      type: fileType,
    });
    const imageUrl = URL.createObjectURL(blob);
    newFile.path = newFileName;
    newFile.preview = imageUrl;
    return newFile;
  };

  const handleImagePreview = async (file: any): Promise<TFile> => {
    const ext = (
      file.name ? file.name.split(".").pop() : file.path.split(".").pop()
    ).toLowerCase();
    if (ext === "heic" || ext === "heif") {
      const fileType = "image/jpeg";
      const blob = await heicTo({
        blob: file,
        type: fileType,
        quality: 0.5,
      });
      return handleConvertToJPEG(file, blob, fileType);
    } else {
      // If not a HEIC/HEIF file, proceed as normal
      return file;
    }
  };

  const onDrop = useCallback(
    async (addedFiles: File[]) => {
      if (maxFiles && countFiles > maxFiles) return;
      const { acceptedFiles } = filterDuplicatedFiles(addedFiles, files);
      setIsConvertImage(true);
      const previews = await Promise.all(
        acceptedFiles.map((file) => handleImagePreview(file)),
      );
      setAcceptedFiles(previews);
      openModal();
      setIsConvertImage(false);
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

  if (isLoading ?? isConvertImage ?? pending)
    return <Icon className="FileUploader-Spinner" type="Spinner" />;

  return (
    <div className="FileUploader" data-name={rest.name}>
      <Previews
        accept={accept}
        className="FileUploader-Previews"
        defaultImages={defaultImages}
        errors={errors}
        files={files}
        isLoading={isLoading ?? isConvertImage ?? pending}
        lng={lng}
        maxFiles={maxFiles}
        multiple={multiple}
        onAddFile={onAddFile}
        onDeleteFile={onDelete}
        onDrop={onDrop}
        onLoad={handleLoadImage}
        theme={theme}
        {...rest}
      />
      <Modal
        isOpen={isOpenModal}
        onCloseModal={closeModal}
        showCloseIcon={false}
        theme={theme}
      >
        {(isLoading ?? isConvertImage) && <Icon type="Spinner" />}
        {acceptedFiles?.[0] && (
          <ImageCropper
            error={errorImageCropper}
            file={acceptedFiles?.[0]}
            onCancel={closeModal}
            onCropFile={handleCropFile}
            onError={setErrorImageCropper}
            theme={theme}
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

FileUploaderComponent.displayName = "FileUploader";

export const FileUploader = memo(FileUploaderComponent);
