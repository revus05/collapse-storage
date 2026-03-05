"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { OrderDTO } from "shared/api";
import { productionStatuses } from "shared/constants";
import { paths } from "shared/navigation/paths";

type OrdersListProps = {
  orders: OrderDTO[];
  emptyText?: string;
};

export const OrdersList: FC<OrdersListProps> = ({
  orders,
  emptyText = "Заказов пока нет",
}) => {
  const formatOrderDate = (value?: string) => {
    if (!value) {
      return "Дата не указана";
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "Дата не указана";
    }

    return parsed.toLocaleString("ru-RU");
  };

  if (orders.length === 0) {
    return (
      <div className="rounded-xl border p-4 text-white/70">{emptyText}</div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      {orders.map((order) => (
        <div
          key={order.uuid}
          className="rounded-xl border p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Заказ #{order.uuid.slice(0, 8)}</h3>
            <span className="text-sm text-white/70">
              {formatOrderDate(order.createdAt)}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {order.products.map((orderProduct) => (
              <Link
                key={orderProduct.uuid}
                href={`${paths.orderProducts}/${orderProduct.uuid}`}
                className="rounded-lg border bg-white/5 p-3 flex gap-3 hover:bg-white/10 transition"
              >
                {orderProduct.product.images[0] && (
                  <Image
                    src={orderProduct.product.images[0]}
                    alt={orderProduct.product.title}
                    width={400}
                    height={400}
                    className="size-16 rounded object-cover border"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-medium flex items-center gap-2">
                    {orderProduct.product.title}
                    {orderProduct.status === "DONE" && (
                      <div
                        title="Выполнен"
                        className="size-5 rounded-full bg-green-700 flex items-center justify-center"
                      >
                        <Check className="size-4" />
                      </div>
                    )}
                  </span>
                  <span className="text-sm text-white/70">
                    Статус: {productionStatuses[orderProduct.status]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};
