import Bowser, { type Parser } from "bowser";
import { useMountEffect } from "@/app/shared/hooks/useMountEffect";
import { useState } from "react";

export const useBrowserAlert = () => {
  const [browser, setBrowser] = useState<Parser.Parser | undefined>();
  const [browserParsed, setBrowserParsed] = useState<
    Parser.Parser | undefined
  >();
  const [isValidBrowser, setIsValidBrowser] = useState<boolean | undefined>();

  useMountEffect(() => {
    if (typeof window !== "undefined") {
      const browser = Bowser.getParser(window.navigator.userAgent);
      const browserParsed = Bowser.getParser(window.navigator.userAgent);
      // const isValidBrowser = browser.satisfies({
      //   chrome: '>=117',
      //   edge: '>=117',
      //   firefox: '>=117',
      //   safari: '>=16.6',
      //   yandex: '>=23.5.2.625',
      // });
      const isValidBrowser =
        browserParsed.getOSName().toLowerCase() !== "macos";
      setBrowser(browser);
      setBrowserParsed(browserParsed);
      setIsValidBrowser(isValidBrowser);
    }
  });

  return { browser, browserParsed, isValidBrowser };
};
