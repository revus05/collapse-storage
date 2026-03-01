import { List, ShelvingUnit, User } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="border-t grid grid-cols-3 px-4 py-3 fixed bottom-0 left-0 right-0 z-1 backdrop-blur-2xl">
      <div className="flex flex-col gap-1 items-center">
        <List />
        <span>Заказы</span>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <ShelvingUnit className="stroke-white/70" />
        <span className="text-white/70">Склад</span>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <User className="stroke-white/70" />
        <span className="text-white/70">Профиль</span>
      </div>
    </nav>
  );
};
