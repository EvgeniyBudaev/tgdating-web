"use client";

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
import { setCanvasPreview } from "@/app/uikit/components/imageCropper/utils";
import { Typography } from "@/app/uikit/components/typography";
import "./ImageCropper.scss";

type TProps = {
  error?: string;
  file: TFile | null | undefined;
  onCancel?: () => void;
  onCropFile?: (file: TFile) => void;
  onError?: (error: string) => void;
};
const ImageCropperComponent = forwardRef<HTMLDivElement, TProps>(
  (
    { error, file, onCancel, onCropFile, onError }: TProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const ASPECT_RATIO = 1;
    const MIN_DIMENSION = 1000;
    const [crop, setCrop] = useState<Crop>();
    const [imageSrc, setImageSrc] = useState("");
    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const imageRef = useRef<HTMLImageElement | null>(null);
    const { t } = useTranslation("index");

    useEffect(() => {
      if (!isEmpty(file) && !isNil(file)) {
        handleImageCrop(file);
        console.log("File before Мб:", file.size / 1024 / 1024);
      }
    }, [file]);

    const handleImageCrop = (file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;
        imageElement.addEventListener("load", (event) => {
          if (error) onError?.("");
          const { naturalHeight, naturalWidth } = event.currentTarget;
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
        // const cropImageSrc = previewCanvasRef.current?.toDataURL();
        const blob = await toBlob(
          previewCanvasRef.current as HTMLCanvasElement,
        );
        if (!isNil(blob) && !isNil(file)) {
          const newFile: TFile = new File([blob], file.name, {
            type: "image/jpg",
          });
          const imageUrl = URL.createObjectURL(blob);
          newFile.path = file.name;
          newFile.preview = imageUrl;
          console.log("newFile after Мб:", newFile.size / 1024 / 1024);
          onCropFile?.(newFile);
        }
      }
    };

    function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
      return new Promise((resolve) => {
        canvas.toBlob(resolve, "image/jpeg", 0.8);
      });
    }

    return (
      <div className="ImageCropper">
        {!isEmpty(imageSrc) && !isNil(imageSrc) && (
          <ReactCrop
            aspect={ASPECT_RATIO}
            crop={crop}
            keepSelection={true}
            circularCrop={true}
            minWidth={MIN_DIMENSION}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
          >
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
          <div
            className="ImageCropper-Control ImageCropper-Cancel"
            onClick={onCancel}
          >
            <Icon type="ArrowBack" />
            <Typography>{t("common.actions.cancel")}</Typography>
          </div>
          <div
            className="ImageCropper-Control ImageCropper-Save"
            onClick={handleCanvasPreview}
          >
            <Icon type="Save" />
            <Typography>{t("common.actions.save")}</Typography>
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
