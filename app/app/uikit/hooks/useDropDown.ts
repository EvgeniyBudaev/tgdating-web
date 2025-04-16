import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DropDownContext, type TDropDownState } from "@/app/uikit/context";

export const useDropDownContext = (): TDropDownState | null => {
  return useContext(DropDownContext);
};

type TProps = {
  isCanClickOutside?: boolean;
};

type TUseDropDown = (props: TProps) => TDropDownState;

export const useDropDown: TUseDropDown = ({ isCanClickOutside }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const refButtonDropDown = useRef<HTMLDivElement>(null);
  const refPanelDropDown = useRef<HTMLDivElement>(null);

  const handleClickButtonDropDown = useCallback(() => {
    setIsDropDownOpen((prevState?: boolean) => !prevState);
  }, []);

  const handleOpen = useCallback(() => {
    setIsDropDownOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsDropDownOpen(false);
  }, []);

  const handleClickOutsideDropDown = useCallback(
    (event: MouseEvent) => {
      if (
        isDropDownOpen &&
        refButtonDropDown.current &&
        event.target instanceof HTMLDivElement &&
        !refButtonDropDown.current.contains(event.target) &&
        isCanClickOutside
      ) {
        if (
          refPanelDropDown.current &&
          !refPanelDropDown.current.contains(event.target)
        ) {
          setIsDropDownOpen((prevState: boolean) =>
            prevState ? false : prevState,
          );
        }
      }
    },
    [isCanClickOutside, isDropDownOpen],
  );

  const handleScroll = useCallback(() => {
    setIsDropDownOpen((prevState: boolean) => (prevState ? false : prevState));
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleClickOutsideDropDown);
    return () => {
      window.removeEventListener("click", handleClickOutsideDropDown);
    };
  });

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return useMemo(() => {
    return {
      isDropDownOpen,
      onClickButtonDropDown: handleClickButtonDropDown,
      onOpen: handleOpen,
      onClose: handleClose,
      refButtonDropDown,
      refPanelDropDown,
    };
  }, [
    isDropDownOpen,
    handleClickButtonDropDown,
    handleOpen,
    handleClose,
    refButtonDropDown,
    refPanelDropDown,
  ]);
};
