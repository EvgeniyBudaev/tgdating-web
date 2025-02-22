import type { ReactNode } from "react";
import { ETheme } from "@/app/uikit/enums/theme";
import type { DropzoneOptions } from "react-dropzone";

export type TDropzoneProps = {
  children?: ReactNode;
  className?: string;
  dataTestId?: string;
  errors?: string | string[] | null;
  name: string;
  multiple: boolean;
  theme?: ETheme;
} & DropzoneOptions;
