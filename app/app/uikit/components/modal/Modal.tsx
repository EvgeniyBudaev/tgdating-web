"use client";

import clsx from "clsx";
import { useState, useEffect, type FC, type ReactNode, useRef } from "react";
import { default as ReactModal } from "react-responsive-modal";
import { Icon } from "@/app/uikit/components/icon";
import type { TModalProps } from "@/app/uikit/components/modal/types";
import { ETheme } from "@/app/uikit/enums/theme";
import "react-responsive-modal/styles.css";
import "./Modal.scss";

export const Modal = ({
  children,
  classes,
  className,
  dataTestId = "uikit__modal",
  isOpen,
  onCloseModal,
  showCloseIcon,
  size = "medium",
  theme,
}: TModalProps): JSX.Element => {
  const modalRef = useRef<HTMLElement | null>(null);
  const defaultClassNames = {
    modal: clsx("ModalDefault", className, {
      ["theme-dark"]: theme === ETheme.Dark,
      ModalDefault__medium: size === "medium",
    }),
    closeButton: clsx("ModalDefaultCloseButton"),
  };
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (isOpen && scrollbarWidth) {
      const _styles = {
        modal: { marginRight: `${scrollbarWidth + 16}px` },
      };
      setStyles(_styles);
      document.body.classList.add("Modal__open");
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      // @ts-ignore
      modalRef.current &&
        modalRef.current?.scrollTo({ x: 0, y: 0, animated: false });
    }

    return () => {
      setStyles({});
      document.body.style.removeProperty("padding-right");
      document.body.classList.remove("Modal__open");
    };
  }, [isOpen]);

  return (
    <ReactModal
      center
      classNames={defaultClassNames}
      closeIcon={<Icon type="Close" />}
      data-testid={dataTestId}
      onClose={onCloseModal}
      open={isOpen}
      initialFocusRef={modalRef}
      showCloseIcon={showCloseIcon}
      styles={styles}
    >
      <div className={clsx(classes?.modal, "Modal")}>{children}</div>
    </ReactModal>
  );
};

type TModalHeaderProps = {
  align?: "start" | "center" | "end";
  children?: ReactNode;
  className?: string;
};

const ModalHeader: FC<TModalHeaderProps> = ({ align, children, className }) => {
  return (
    <div
      className={clsx("ModalHeader", className, {
        ModalHeader__start: align === "start",
        ModalHeader__center: align === "center",
        ModalHeader__end: align === "end",
      })}
    >
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;

type TModalContentProps = {
  children?: ReactNode;
  className?: string;
};

const ModalContent: FC<TModalContentProps> = ({ children, className }) => {
  return <div className={clsx("ModalContent", className)}>{children}</div>;
};

Modal.Content = ModalContent;

type TModalFooterProps = {
  className?: string;
  children?: ReactNode;
};

const ModalFooter: FC<TModalFooterProps> = ({ children, className }) => {
  return <div className={clsx("ModalFooter", className)}>{children}</div>;
};

Modal.Footer = ModalFooter;
