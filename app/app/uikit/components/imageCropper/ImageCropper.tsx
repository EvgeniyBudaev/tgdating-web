"use client";

import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  ForwardedRef,
  forwardRef,
  memo,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  type Crop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { useTranslation } from "@/app/i18n/client";
import type { TFile } from "@/app/shared/types/file";
import { Icon } from "@/app/uikit/components/icon";
import type { TImageCropperProps } from "@/app/uikit/components/imageCropper/types";
import {
  imageResize,
  setCanvasPreview,
} from "@/app/uikit/components/imageCropper/utils";
import { Typography } from "@/app/uikit/components/typography";
import { ETheme } from "@/app/uikit/enums/theme";
import "./ImageCropper.scss";

const ImageCropperComponent = forwardRef<HTMLDivElement, TImageCropperProps>(
  (
    { error, file, onCancel, onCropFile, onError, theme }: TImageCropperProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const ASPECT_RATIO = 1;
    const MIN_DIMENSION = 200;
    const [crop, setCrop] = useState<Crop>();
    const [imageSrc, setImageSrc] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const { t } = useTranslation("index");

    useEffect(() => {
      if (!isEmpty(file) && !isNil(file)) {
        handleImageCrop(file);
        // console.log("File before Мб:", file.size / 1024 / 1024);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const handleImageCrop = (file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;
        imageElement.addEventListener("load", (event) => {
          if (error) onError?.("");
          const { naturalHeight, naturalWidth } =
            event.currentTarget as HTMLImageElement;
          if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
            const errorMessage = t("common.validation.smallImage");
            onError?.(errorMessage);
            return setImageSrc("");
          }
        });
        setImageSrc(imageUrl);
      });
      reader.readAsDataURL(file);
    };

    const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
      const { height, width } = event.currentTarget;
      const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
      const crop = makeAspectCrop(
        {
          unit: "%",
          width: cropWidthInPercent,
        },
        ASPECT_RATIO,
        width,
        height,
      );
      const centeredCrop = centerCrop(crop, width, height);
      setCrop(centeredCrop);
    };

    const handleCanvasPreview = async () => {
      if (
        !isNil(imageRef?.current?.width) &&
        !isNil(imageRef?.current?.height) &&
        !isNil(previewCanvasRef?.current) &&
        !isNil(crop)
      ) {
        setCanvasPreview(
          imageRef.current as HTMLImageElement,
          previewCanvasRef.current as HTMLCanvasElement,
          convertToPixelCrop(
            crop,
            imageRef?.current?.width,
            imageRef?.current?.height,
          ),
        );
        const canvas = previewCanvasRef.current;
        if (canvas) {
          setIsLoading(true);
          const canvasResized = imageResize(canvas, { width: 640 });
          if (!canvasResized) return setIsLoading(false);
          canvas.width = canvasResized.width;
          canvas.height = canvasResized.height;
          const ctx = canvas.getContext("2d");
          if (!ctx) return setIsLoading(false);
          ctx.drawImage(canvasResized, 0, 0);
          setIsLoading(false);
          // const cropImageSrc = previewCanvasRef.current?.toDataURL();
          const fileType = "image/jpeg";
          const blob = await toBlob(
            previewCanvasRef.current as HTMLCanvasElement,
            fileType,
          );
          if (!isNil(blob) && !isNil(file)) {
            const fileName = file.name;
            const newFileName = fileName.replace(/\.[^/.]+$/, ".jpeg");
            const newFile: TFile = new File([blob], newFileName, {
              type: fileType,
            });
            const imageUrl = URL.createObjectURL(blob);
            newFile.path = newFileName;
            newFile.preview = imageUrl;
            // console.log("File after Мб:", newFile.size / 1024 / 1024);
            onCropFile?.(newFile);
          }
        }
      }
    };

    function toBlob(
      canvas: HTMLCanvasElement,
      fileType: string,
    ): Promise<Blob | null> {
      return new Promise((resolve) => {
        canvas.toBlob(resolve, fileType, 0.8);
      });
    }

    return (
      <div
        className={clsx("ImageCropper", {
          ["theme-dark"]: theme === ETheme.Dark,
        })}
      >
        {!isEmpty(imageSrc) && !isNil(imageSrc) && (
          <ReactCrop
            aspect={ASPECT_RATIO}
            crop={crop}
            keepSelection={true}
            circularCrop={true}
            minWidth={MIN_DIMENSION}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
            {/* eslint-disable-next-line*/}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Upload"
              style={{ maxHeight: "70vh" }}
              onLoad={handleImageLoad}
            />
          </ReactCrop>
        )}
        <div className="ImageCropper-Controls">
          <div className="ImageCropper-Controls-Button">
            <div
              className="ImageCropper-Controls-Item ImageCropper-Controls-Item-Pink"
              onClick={onCancel}
            >
              <div className="ImageCropper-Controls-Box ImageCropper-Controls-Box-Pink">
                <Icon className="ImageCropper-Controls-Icon" type="Close" />
              </div>
            </div>
            <span className="ImageCropper-Controls-Text ImageCropper-Controls-Text-Pink">
              <Typography>{t("common.actions.cancel")}</Typography>
            </span>
          </div>
          <div className="ImageCropper-Controls-Button">
            <div
              className="ImageCropper-Controls-Item ImageCropper-Controls-Item-Green"
              onClick={handleCanvasPreview}
            >
              <div className="ImageCropper-Controls-Box ImageCropper-Controls-Box-Green">
                {!isLoading ? (
                  <Icon type="Save" />
                ) : (
                  <Icon className="ImageCropper-Loading-Icon" type="Spinner" />
                )}
              </div>
            </div>
            <span className="ImageCropper-Controls-Text ImageCropper-Controls-Text-Green">
              {!isLoading ? (
                <Typography>{t("common.actions.save")}</Typography>
              ) : (
                <Typography>{t("common.actions.loading")}</Typography>
              )}
            </span>
          </div>
        </div>
        {crop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              display: "none",
              width: 150,
              height: 150,
              objectFit: "contain",
            }}
          />
        )}
      </div>
    );
  },
);

ImageCropperComponent.displayName = "ImageCropper";

export const ImageCropper = memo(ImageCropperComponent);
