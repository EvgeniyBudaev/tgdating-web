"use client";

import { type FC, memo } from "react";
import type { TRootPageProps } from "@/app/pages/rootPage/types";
import "./RootPage.scss";
import {useNavigator} from "@/app/shared/hooks";

const RootPageComponent: FC<TRootPageProps> = (props) => {
  const navigator = useNavigator({ lng: props.lng });
  return (
    <div>
      <div>navigator: {JSON.stringify(navigator, null, 2)}</div>
      <div>
        <button onClick={navigator.getFromNavigator}>request location from navigator</button>
      </div>
    </div>
  )
};

RootPageComponent.displayName = "RootPage";

export const RootPage = memo(RootPageComponent);
