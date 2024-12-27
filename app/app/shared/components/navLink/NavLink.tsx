"use client";

import clsx from "clsx";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

type TProps = {
  activeClassName?: string;
  className?: string;
  href: string;
  pathname: string;
} & PropsWithChildren;

export const NavLink: FC<TProps> = ({
  activeClassName = "isActive",
  children,
  className,
  href,
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
    >
      {children}
    </Link>
  );
};
