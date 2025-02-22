import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import type { FC } from "react";
import type { TButtonLinkProps } from "@/app/uikit/components/button/buttonLink/types";
import "../Button.scss";

const ButtonLinkComponent: FC<TButtonLinkProps> = ({
  className,
  children,
  href,
}) => {
  return (
    <Link className={clsx(className, "Button")} href={href}>
      {children}
    </Link>
  );
};

ButtonLinkComponent.displayName = "ButtonLink";

export const ButtonLink = memo(ButtonLinkComponent);
