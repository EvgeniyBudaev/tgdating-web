"use client";

import clsx from "clsx";
import isNil from "lodash/isNil";
import Image from "next/image";
import { type FC, memo } from "react";
import type { Accept, DropEvent, FileRejection } from "react-dropzone";
import type { TImage } from "@/app/api/image";
import { useTranslation } from "@/app/i18n/client";
import { ImageList } from "@/app/shared/components/form/fileUploader/previews/imageList";
import type { TFile } from "@/app/shared/types/file";
import { DropDown } from "@/app/uikit/components/dropDown";
import { Dropzone } from "@/app/uikit/components/dropzone";
import type { TDropzoneProps } from "@/app/uikit/components/dropzone/types";
import { Icon } from "@/app/uikit/components/icon";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Previews.scss";

type TProps = {
  accept?: Accept;
  className?: string;
  defaultImages?: TImage[];
  errors?: string | string[] | null;
  files?: TFile[];
  isLoading?: boolean;
  lng: string;
  maxFiles?: number;
  multiple: boolean;
  onAddFile?: (file: TFile) => void;
  onDeleteFile?: (file: TFile) => void;
  onDrop?: (
    addedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void;
  onLoad?: (file: TFile) => void;
  theme?: ETheme;
} & TDropzoneProps;

const PreviewsComponent: FC<TProps> = ({
  accept,
  className,
  defaultImages,
  errors,
  files,
  isLoading,
  lng,
  maxFiles,
  multiple,
  onDeleteFile,
  onDrop,
  theme,
  ...rest
}) => {
  const { t } = useTranslation("index");

  const renderDefaultImages = !isNil(defaultImages) && (
    <ImageList defaultImages={defaultImages} lng={lng} theme={theme} />
  );

  const renderThumbs =
    !isNil(files) &&
    files.map((file) => (
      <div
        className="Previews-Thumb"
        key={file?.name || "" + file?.lastModified}
      >
        <div className="Previews-Thumb-Inner">
          {!isNil(file.preview) && (
            <DropDown theme={theme}>
              <DropDown.Button>
                <div className="Previews-Thumb-WrapperImage">
                  <Image
                    alt={file.name}
                    className="Previews-Thumb-Image"
                    fill={true}
                    priority={true}
                    sizes="300px"
                    src={file.preview}
                    quality={100}
                  />
                </div>
              </DropDown.Button>
              <DropDown.Panel>
                <div className="DropDown-Menu">
                  <div
                    className="DropDown-MenuItem"
                    onClick={() => onDeleteFile?.(file)}
                  >
                    <Typography>{t("common.actions.delete")}</Typography>
                  </div>
                </div>
                <div className="DropDown-Menu">
                  <div className="DropDown-MenuItem DropDown-MenuItem-Cancel">
                    <Typography>{t("common.actions.cancel")}</Typography>
                  </div>
                </div>
              </DropDown.Panel>
            </DropDown>
          )}
        </div>
      </div>
    ));

  const isCheckedByMaxFiles = maxFiles
    ? (files?.length ?? 0) + (defaultImages?.length ?? 0) < maxFiles
    : true;

  return (
    <aside
      className={clsx("Previews", className, {
        ["theme-dark"]: theme === ETheme.Dark,
      })}
    >
      {renderDefaultImages}
      {renderThumbs}
      {isCheckedByMaxFiles && (
        <div className="Previews-Thumb">
          <div className="Previews-Thumb-Inner">
            <Dropzone
              accept={accept}
              className={clsx("Previews-Dropzone", {
                ["FileUploader-Dropzone__isLoading"]: isLoading,
              })}
              disabled={isLoading}
              errors={errors}
              multiple={multiple}
              onDrop={onDrop}
              theme={theme}
              {...rest}
            >
              <Icon className="Previews-Icon" type="AddCircleOutline" />
            </Dropzone>
          </div>
        </div>
      )}
    </aside>
  );
};

PreviewsComponent.displayName = "Previews";

export const Previews = memo(PreviewsComponent);
