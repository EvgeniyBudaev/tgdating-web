import Bowser from "bowser";

export const useBrowser = () => {
  let isValidBrowser = false;

  if (typeof window !== "undefined") {
    const browserParsed = Bowser.getParser(window.navigator.userAgent);
    isValidBrowser = browserParsed.getOSName().toLowerCase() !== "macos";
  }

  return { isValidBrowser };
};
