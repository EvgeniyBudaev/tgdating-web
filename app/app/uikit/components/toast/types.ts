import { EToast } from "@/app/uikit/components/toast/enums";

export type TToastProps = {
  className?: string;
  dataTestId?: string;
  description?: string;
  onClose?: () => void;
  title?: string;
  type?: EToast;
};
