import { makeStore } from "app/store";
import { productApi } from "entity/product";
import { CreateProductForm } from "features/products/create";
import { withHomeLayout } from "widgets/layouts/home";
import { ProductsList } from "widgets/product/products-list";

const Products = async () => {
  const store = makeStore();

  store.dispatch(productApi.endpoints.getAllProducts.initiate());

  await Promise.all(store.dispatch(productApi.util.getRunningQueriesThunk()));

  const state = store.getState();

  const response = productApi.endpoints.getAllProducts.select()(state)?.data;

  const products = response?.data;

  if (!products) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Продукты</h1>
        <CreateProductForm />
      </div>
      <ProductsList products={products} />
    </div>
  );
};

export default withHomeLayout(Products);
