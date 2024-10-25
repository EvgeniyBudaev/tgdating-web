type TImageResizeOptions = {
  width: number;
};

export const imageResize = (
  canvas: HTMLCanvasElement,
  options: TImageResizeOptions,
): HTMLCanvasElement => {
  const { width } = options;
  const originalWidth = canvas.width;
  const originalHeight = canvas.height;
  const ratio = width / originalWidth;
  const newHeight = originalHeight * ratio;

  // Создаем новый canvas с заданными размерами
  const resizedCanvas = document.createElement("canvas");
  resizedCanvas.width = width;
  resizedCanvas.height = newHeight;

  // Получаем контекст 2D для нового canvas
  const ctx = resizedCanvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";

  // Рисуем изображение из `canvas` на новый canvas с использованием масштабирования
  ctx.drawImage(
    canvas,
    0,
    0,
    originalWidth,
    originalHeight,
    0,
    0,
    width,
    newHeight,
  );

  // Возвращаем новый canvas с измененным размером
  return resizedCanvas;
};
