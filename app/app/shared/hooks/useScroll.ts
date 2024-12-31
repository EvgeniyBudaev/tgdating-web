import { useEffect, useState } from "react";

type TUseScrollResponse = {
  hasScroll: boolean;
};

type TUseScroll = () => TUseScrollResponse;

export const useScroll: TUseScroll = () => {
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScroll(true);
      } else {
        setHasScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    hasScroll,
  };
};
