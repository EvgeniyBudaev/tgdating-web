"use client";

import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import {
  type FC,
  type SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  type Crop,
} from "react-image-crop";
import "react-image-crop/src/ReactCrop.scss";
import { setCanvasPreview } from "@/app/uikit/components/imageCropper/utils";
import "./ImageCropper.scss";

type TProps = {
  imageSrc: string;
  minDimension: number;
};

export const ImageCropper: FC<TProps> = (props) => {
  const ASPECT_RATIO = 1;
  const [crop, setCrop] = useState<Crop>();
  const [imageSrc, setImageSrc] = useState(props.imageSrc);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    !isEmpty(imageSrc) && setImageSrc(props.imageSrc);
  }, [props.imageSrc]);

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const { height, width } = event.currentTarget;
    const cropWidthInPercent = (props.minDimension / width) * 100;
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

  const handleCanvasPreview = () => {
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
      const cropImageSrc = previewCanvasRef.current?.toDataURL();
    }
  };

  return (
    <div className="ImageCropper">
      {!isEmpty(imageSrc) && !isNil(imageSrc) && (
        <ReactCrop
          aspect={ASPECT_RATIO}
          crop={crop}
          keepSelection={true}
          circularCrop={true}
          minWidth={props.minDimension}
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
      <button onClick={handleCanvasPreview}>Crop Image</button>
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
};
