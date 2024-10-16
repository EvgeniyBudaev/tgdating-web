"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC, PropsWithChildren } from "react";

type TProps = {
  activeClassName?: string;
  className?: string;
  href: string;
} & PropsWithChildren;

export const NavLink: FC<TProps> = ({
  activeClassName = "isActive",
  className,
  href,
  children,
}) => {
  const pathname = usePathname();

  const removeQueryParams = (url: string): string => {
    const match = url.match(/^(.+?)\?/);
    return match ? match[1] : url;
  };

  const cleanHref = removeQueryParams(href);
  console.log("pathname", pathname);
  console.log("href", cleanHref);

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
