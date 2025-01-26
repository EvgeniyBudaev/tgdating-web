"use client";

import clsx from "clsx";
import Link from "next/link";
import type { FC, MouseEvent, PropsWithChildren } from "react";

type TProps = {
  activeClassName?: string;
  className?: string;
  href: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
  pathname: string;
} & PropsWithChildren;

export const NavLink: FC<TProps> = ({
  activeClassName = "isActive",
  children,
  className,
  href,
  onClick,
  pathname,
}) => {
  const removeQueryParams = (url: string): string => {
    const match = url.match(/^(.+?)\?/);
    return match ? match[1] : url;
  };

  const cleanHref = removeQueryParams(href);

  return (
    <Link
      className={clsx(
        className,
        `${pathname === cleanHref ? activeClassName : ""}`,
      )}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};
