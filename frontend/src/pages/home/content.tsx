"use client";

import { useGetAllOrdersQuery } from "entity/order";
import { CreateOrderForm } from "features/order/create";
import { OrdersList } from "widgets/order/orders-list";

type HomeContentProps = {
  isAdmin: boolean;
};

export const HomeContent = ({ isAdmin }: HomeContentProps) => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetAllOrdersQuery();

  if (isLoading || isFetching) {
    return <div className="rounded-xl border p-4 text-white/70">Загрузка заказов...</div>;
  }

  if (isError || !response) {
    return <div className="rounded-xl border p-4 text-red-300">Не удалось загрузить заказы</div>;
  }

  return (
    <main className="grow flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-bold text-2xl">Заказы</h1>
        {isAdmin && <CreateOrderForm />}
      </div>
      <OrdersList orders={response.data ?? []} />
    </main>
  );
};

