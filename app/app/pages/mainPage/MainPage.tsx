"use client";

import { type FC, memo } from "react";
import { useMainPage } from "@/app/pages/mainPage/hooks";
import type { TMainPageProps } from "@/app/pages/mainPage/types";

const MainPageComponent: FC<TMainPageProps> = (props) => {
  useMainPage(props);

  return <span></span>;
};

MainPageComponent.displayName = "MainPage";

export const MainPage = memo(MainPageComponent);
