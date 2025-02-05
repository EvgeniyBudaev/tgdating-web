import clsx from "clsx";
import Link from "next/link";
import { memo } from "react";
import type { FC, ReactNode } from "react";
import "../Button.scss";

type TProps = {
  children?: ReactNode;
  className?: string;
  href: string;
};

const ButtonLinkComponent: FC<TProps> = ({ className, children, href }) => {
  return (
    <Link className={clsx(className, "Button")} href={href}>
      {children}
    </Link>
  );
};

export const ButtonLink = memo(ButtonLinkComponent);
