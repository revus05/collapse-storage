"use client";

import { useGetOrderProductByIdQuery } from "entity/order";
import { ProductionActions } from "features/order-product/production-actions";
import Image from "next/image";

type OrderProductPageContentProps = {
  uuid: string;
};

export const OrderProductPageContent = ({ uuid }: OrderProductPageContentProps) => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetOrderProductByIdQuery(uuid);

  if (isLoading || isFetching) {
    return <div className="rounded-xl border p-4 text-white/70">Загрузка позиции заказа...</div>;
  }

  if (isError || !response?.data) {
    return <div className="rounded-xl border p-4 text-red-300">Позиция заказа не найдена</div>;
  }

  const orderProduct = response.data;

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Изготовление продукта</h1>

      <div className="rounded-xl border p-4 flex gap-4 items-center">
        {orderProduct.product.images[0] && (
          <Image
            src={orderProduct.product.images[0]}
            alt={orderProduct.product.title}
            width={120}
            height={120}
            className="size-24 rounded object-cover border"
          />
        )}
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-lg">{orderProduct.product.title}</span>
          <span className="text-white/70">Заказ: {orderProduct.orderUuid}</span>
          <span className="text-white/70">Позиция: {orderProduct.uuid}</span>
        </div>
      </div>

      <ProductionActions orderProduct={orderProduct} />
    </div>
  );
};

