import clsx from "clsx";
import { memo, useEffect, useRef } from "react";
import type { FC, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";
import { Icon } from "@/app/uikit/components/icon";
import { TRANSITION } from "@/app/uikit/constants";
import { ETheme } from "@/app/uikit/enums/theme";
import "./Accordion.scss";

type TProps = {
  className?: string;
  dataTestId?: string;
  isActive?: boolean;
  onToggle?: () => void;
  theme?: ETheme;
  title?: string;
} & PropsWithChildren;

const AccordionComponent: FC<TProps> = ({
  className,
  dataTestId = "uikit__accordion",
  isActive = false,
  onToggle,
  theme,
  title = "",
  children = null,
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const contentHeight = nodeRef.current?.scrollHeight;

  const setAtToStringAndPx = (value: number): string => {
    return value.toString() + "px";
  };

  useEffect(() => {
    if (nodeRef.current && contentHeight) {
      nodeRef.current.style.setProperty(
        "--content-height",
        setAtToStringAndPx(contentHeight),
      );
    }
  }, [contentHeight]);

  return (
    <div
      className={clsx("Accordion", className, {
        ["theme-dark"]: theme === ETheme.Dark,
        Accordion__active: isActive,
      })}
      data-testid={dataTestId}
    >
      <div className="Accordion-Header">
        <Icon
          className="Accordion-HeaderIcon"
          onClick={onToggle}
          type="ArrowForwardIOS"
        />
      </div>
      {!isActive && <div className="Accordion-HeaderTitle">{title}</div>}

      <CSSTransition
        className="Accordion-ContentWrapper"
        in={isActive}
        nodeRef={nodeRef}
        timeout={TRANSITION}
        unmountOnExit
      >
        <div ref={nodeRef}>
          <div className="Accordion-Content">{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export const Accordion = memo(AccordionComponent);
