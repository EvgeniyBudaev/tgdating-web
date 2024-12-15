"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo } from "react";
import type { FC, PropsWithChildren } from "react";

type TProps = {
  activeClassName?: string;
  className?: string;
  href: string;
} & PropsWithChildren;

const NavLinkComponent: FC<TProps> = ({
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

NavLinkComponent.displayName = "NavLink";

export const NavLink = memo(NavLinkComponent);
