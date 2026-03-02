"use client";

import { List, ShelvingUnit, SquareChartGantt, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import type { UserDTO } from "shared/api";
import { cn } from "shared/lib";
import { paths } from "shared/navigation/paths";

type NavigationProps = {
  user: UserDTO;
};

export const Navigation: FC<NavigationProps> = ({ user }) => {
  const isAdmin = user.role === "ADMIN";

  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "border-t grid grid-cols-3 px-2 py-1.5 fixed bottom-0 left-0 right-0 z-1 backdrop-blur-2xl",
        isAdmin && "grid-cols-4",
      )}
    >
      <Link
        href={paths.orders}
        className={cn(
          "flex flex-col gap-1 items-center rounded-lg px-2 py-1.5",
          pathname === paths.orders &&
            "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border py-1.25",
        )}
      >
        <List className="stroke-white/70" />
        <span className="text-white/70">Заказы</span>
      </Link>
      <Link
        href={paths.materials}
        className={cn(
          "flex flex-col gap-1 items-center rounded-lg px-2 py-1.5",
          pathname === paths.materials &&
            "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border py-1.25",
        )}
      >
        <ShelvingUnit className="stroke-white/70" />
        <span className="text-white/70">Материалы</span>
      </Link>
      {isAdmin && (
        <Link
          href={paths.products}
          className={cn(
            "flex flex-col gap-1 items-center rounded-lg px-2 py-1.5",
            pathname?.includes(paths.products) &&
              "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border py-1.25",
          )}
        >
          <SquareChartGantt className="stroke-white/70" />
          <span className="text-white/70">Продукты</span>
        </Link>
      )}
      <Link
        href={paths.profile}
        className={cn(
          "flex flex-col gap-1 items-center rounded-lg px-2 py-1.5",
          pathname === paths.profile &&
            "[&_svg]:stroke-white [&_span]:text-white bg-white/10 border py-1.25",
        )}
      >
        <User className="stroke-white/70" />
        <span className="text-white/70">Профиль</span>
      </Link>
    </nav>
  );
};
