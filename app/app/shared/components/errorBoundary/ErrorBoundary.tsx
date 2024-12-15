import type { FC } from "react";
import { ErrorUI } from "@/app/shared/components/errorUI";

type TProps = {
  error?: Error;
  message?: string;
};

export const ErrorBoundary: FC<TProps> = (props) => {
  return <ErrorUI {...props} />;
};
