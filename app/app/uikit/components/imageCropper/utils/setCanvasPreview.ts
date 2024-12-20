import { Crop } from "react-image-crop";

export const setCanvasPreview = (
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: Crop,
) => {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to getProfile canvas context");
  }

  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const width = Math.floor(crop.width * scaleX * pixelRatio);
  const height = Math.floor(crop.height * scaleY * pixelRatio);
  canvas.width = width;
  canvas.height = height;

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );

  ctx.restore();
};
