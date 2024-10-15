import type { FC } from "react";
import { Icon } from "@/app/uikit/components/icon";
import "./Loader.scss";

export const Loader: FC = () => {
  return (
    <div className="Loader">
      <Icon type="Spinner" />
    </div>
  );
};
