"use client";

import { List, ShelvingUnit, SquareChartGantt, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type FC, useEffect, useRef, useState } from "react";
import type { UserDTO } from "shared/api";
import { cn } from "shared/lib";
import { paths } from "shared/navigation/paths";

type NavigationProps = {
  user: UserDTO;
};

export const Navigation: FC<NavigationProps> = ({ user }) => {
  const isAdmin = user.role === "ADMIN";

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFromOrdersTransition, setIsFromOrdersTransition] = useState(false);
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const previousPathname = previousPathnameRef.current;
    const wasOrdersPath =
      previousPathname === paths.orders ||
      Boolean(previousPathname?.startsWith("/orders/"));
    const isCurrentOrdersPath =
      pathname === paths.orders || pathname.startsWith("/orders/");

    setIsFromOrdersTransition(wasOrdersPath && !isCurrentOrdersPath);
    previousPathnameRef.current = pathname;
  }, [pathname]);

  const isFromOrdersFlow =
    searchParams?.get("from") === "orders" || isFromOrdersTransition;

  const isPathActive = (targetPath: string) => {
    if (!pathname) {
      return false;
    }

    if (isFromOrdersFlow) {
      return targetPath === paths.orders;
    }

    if (targetPath === paths.orders) {
      return pathname === paths.orders || pathname.startsWith("/orders/");
    }

    return pathname === targetPath || pathname.startsWith(`${targetPath}/`);
  };

  return (
    <nav
      className={cn(
        "md:border-t border md:rounded-2xl md:gap-1 gap-0 rounded-none grid md:grid-cols-1! grid-cols-3 px-2 py-1.5 md:static fixed bottom-0 left-0 right-0 z-1 backdrop-blur-2xl",
        isAdmin && "grid-cols-4",
      )}
    >
      <Link
        href={paths.orders}
        className={cn(
          "flex flex-col md:flex-row gap-1 items-center rounded-lg px-2 py-1.5 border border-transparent",
          isPathActive(paths.orders) &&
            "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border-border md:py-1.5 py-1.25",
        )}
      >
        <List className="stroke-white/70" />
        <span className="text-white/70">Заказы</span>
      </Link>
      <Link
        href={paths.materials}
        className={cn(
          "flex flex-col md:flex-row gap-1 items-center rounded-lg px-2 py-1.5 border border-transparent",
          isPathActive(paths.materials) &&
            "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border-border md:py-1.5 py-1.25",
        )}
      >
        <ShelvingUnit className="stroke-white/70" />
        <span className="text-white/70">Материалы</span>
      </Link>
      {isAdmin && (
        <Link
          href={paths.products}
          className={cn(
            "flex flex-col md:flex-row gap-1 items-center rounded-lg px-2 py-1.5 border border-transparent",
            isPathActive(paths.products) &&
              "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border-border md:py-1.5 py-1.25",
          )}
        >
          <SquareChartGantt className="stroke-white/70" />
          <span className="text-white/70">Продукты</span>
        </Link>
      )}
      <Link
        href={paths.profile}
        className={cn(
          "flex flex-col md:flex-row gap-1 items-center rounded-lg px-2 py-1.5 border border-transparent",
          isPathActive(paths.profile) &&
            "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border-border md:py-1.5 py-1.25",
        )}
      >
        {user.image ? (
          <Image
            src={user.image}
            alt="profile avatar"
            width={24}
            height={24}
            className="size-6 rounded-full object-cover border"
          />
        ) : (
          <User className="stroke-white/70" />
        )}
        <span className="text-white/70">Профиль</span>
      </Link>
    </nav>
  );
};
