import type { TFile } from "@/app/shared/types/file";
import { ETheme } from "@/app/uikit/enums/theme";

export type TImageCropperProps = {
  error?: string;
  file: TFile | null | undefined;
  onCancel?: () => void;
  onCropFile?: (file: TFile) => void;
  onError?: (error: string) => void;
  theme?: ETheme;
};
