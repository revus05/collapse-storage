"use client";

import { useGetAllProductsQuery } from "entity/product";
import { CreateProductForm } from "features/product/create";
import { ProductsList } from "widgets/product/products-list";

export const ProductsContent = () => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetAllProductsQuery();

  if (isLoading || isFetching) {
    return <div className="rounded-xl border p-4 text-white/70">Загрузка продуктов...</div>;
  }

  if (isError || !response) {
    return <div className="rounded-xl border p-4 text-red-300">Не удалось загрузить продукты</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Продукты</h1>
        <CreateProductForm />
      </div>
      <ProductsList products={response.data} />
    </div>
  );
};

