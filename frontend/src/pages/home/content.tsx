"use client";

import { useGetAllOrdersQuery } from "entity/order";
import { CreateOrderForm } from "features/order/create";
import { useMemo, useState } from "react";
import { OrdersList } from "widgets/order/orders-list";

type OrdersTab = "queue" | "in-progress" | "archive";

const ordersTabs: { id: OrdersTab; label: string; emptyText: string }[] = [
  {
    id: "queue",
    label: "Очередь",
    emptyText: "В очереди пока нет заказов",
  },
  {
    id: "in-progress",
    label: "В процессе",
    emptyText: "В процессе пока нет заказов",
  },
  {
    id: "archive",
    label: "Архив",
    emptyText: "В архиве пока нет заказов",
  },
];

type HomeContentProps = {
  isAdmin: boolean;
};

export const HomeContent = ({ isAdmin }: HomeContentProps) => {
  const [activeTab, setActiveTab] = useState<OrdersTab>("queue");

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetAllOrdersQuery();
  const orders = response?.data ?? [];

  const groupedOrders = useMemo(() => {
    return orders.reduce<Record<OrdersTab, typeof orders>>(
      (accumulator, order) => {
        const statuses = order.products.map((product) => product.status);

        if (statuses.every((status) => status === "DONE")) {
          accumulator.archive.push(order);
          return accumulator;
        }

        if (statuses.every((status) => status === "QUEUED")) {
          accumulator.queue.push(order);
          return accumulator;
        }

        accumulator["in-progress"].push(order);
        return accumulator;
      },
      { queue: [], "in-progress": [], archive: [] },
    );
  }, [orders]);

  if (isLoading || isFetching) {
    return (
      <div className="rounded-xl border p-4 text-white/70">
        Загрузка заказов...
      </div>
    );
  }

  if (isError || !response) {
    return (
      <div className="rounded-xl border p-4 text-red-300">
        Не удалось загрузить заказы
      </div>
    );
  }

  const currentTab =
    ordersTabs.find((tab) => tab.id === activeTab) ?? ordersTabs[0];

  return (
    <main className="grow flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-bold text-2xl">Заказы</h1>
        {isAdmin && <CreateOrderForm />}
      </div>
      <div className="rounded-xl border p-1 grid grid-cols-3 gap-1">
        {ordersTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={
              activeTab === tab.id
                ? "rounded-lg border bg-white/10 px-3 py-2 text-sm font-medium text-white"
                : "rounded-lg border border-transparent px-3 py-2 text-sm text-white/70 hover:bg-white/5"
            }
          >
            {tab.label} ({groupedOrders[tab.id].length})
          </button>
        ))}
      </div>
      <OrdersList
        orders={groupedOrders[activeTab]}
        emptyText={currentTab.emptyText}
      />
    </main>
  );
};
