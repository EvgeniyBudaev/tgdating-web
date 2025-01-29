"use client";

import clsx from "clsx";
import { type FC, memo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { DATA_TEST_ID } from "@/app/uikit/components/tooltipV2/constants";
import type {
  TModifiers,
  TTooltipProps,
} from "@/app/uikit/components/tooltipV2/types";
import { getTooltipOffset } from "@/app/uikit/components/tooltipV2/utils";
import "./TooltipV2.scss";
import { ETheme } from "@/app/uikit/enums/theme";

const TooltipV2Component: FC<TTooltipProps> = ({
  children,
  classes,
  dataTestId = DATA_TEST_ID,
  isOpen,
  isVisible = false,
  message,
  modifiers,
  onClose,
  placement = "right",
  timerDelay = 1000,
  theme,
  showTimerDelay = 0,
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(isVisible);
  const isManualVisibility = typeof isOpen !== "undefined";
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();
  const [showTimer, setShowTimer] = useState<NodeJS.Timeout | undefined>();

  let popperModifiers: TModifiers = [
    {
      name: "arrow",
      options: {
        element: arrowElement,
        padding: 12,
      },
    },
    {
      name: "offset",
      options: {
        offset: getTooltipOffset({ placement, referenceElement }),
      },
    },
    {
      name: "preventOverflow",
      options: {
        altBoundary: true,
      },
    },
  ];

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
    }
  }, [isVisible]);

  useEffect(() => {
    const listener = () => {
      setVisible(false);
      onClose?.();
    };
    document.addEventListener("scroll", listener);
    return () => document.removeEventListener("scroll", listener);
  }, []);

  if (modifiers) {
    popperModifiers = popperModifiers.concat(modifiers);
  }

  const { styles, attributes, state } = usePopper(
    referenceElement,
    popperElement,
    {
      modifiers: popperModifiers,
      placement,
    },
  );

  useEffect(() => {
    if (!visible)
      return () => {
        clearTimeout(timer);
        clearTimeout(showTimer);
      };
  }, [showTimer, timer, visible]);

  const handleMouseOver = () => {
    clearTimeout(timer);
    if (!isManualVisibility && !showTimer) {
      const showTimer = setTimeout(() => {
        setVisible(true);
      }, showTimerDelay);
      setShowTimer(showTimer);
    }
  };

  const handleMouseLeave = () => {
    const newTimer = setTimeout(() => {
      clearTimeout(showTimer);
      setShowTimer((prev) => undefined);
      setVisible(false);
      onClose?.();
    }, timerDelay);
    setTimer(newTimer);
  };

  const handleInnerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      data-testid={dataTestId}
      className={clsx("TooltipV2-Wrapper", classes?.root)}
    >
      <div
        className={clsx("TooltipV2", classes?.referenceElement, {
          ["theme-dark"]: theme === ETheme.Dark,
        })}
        data-testid="tooltip__ref-element"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        ref={setReferenceElement}
      >
        {children}
      </div>

      {
        // isHydrated &&
        visible &&
          message &&
          ReactDOM.createPortal(
            <div
              className={clsx("TooltipV2-Element", classes?.popperElement, {
                ["theme-dark"]: theme === ETheme.Dark,
              })}
              data-testid={`${DATA_TEST_ID}__popper-element`}
              onClick={handleInnerClick}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              ref={setPopperElement}
              style={{
                ...styles.popper,
              }}
              {...attributes.popper}
            >
              <div
                className={clsx(
                  "TooltipV2-ElementInner",
                  classes?.popperContent,
                  {
                    ["theme-dark"]: theme === ETheme.Dark,
                  },
                )}
                data-testid={`${DATA_TEST_ID}__popper-content`}
              >
                {message}

                <div
                  className={clsx("TooltipV2-Arrow", classes?.arrow)}
                  ref={setArrowElement}
                  style={styles.arrow}
                  data-testid={`${DATA_TEST_ID}__arrow`}
                />
              </div>
            </div>,
            document.body,
          )
      }
    </div>
  );
};

TooltipV2Component.displayName = "TooltipV2";

export const TooltipV2 = memo(TooltipV2Component);
