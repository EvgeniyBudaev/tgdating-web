"use client";

import { type EffectCallback, useEffect } from "react";

export const useMountEffect = (callback: EffectCallback) => {
  return useEffect(callback, []);
};
