"use client";

import { useCreateProductMutation } from "entity/product";
import type { ProductFormData } from "./schema";

export const useCreateProductSubmit = () => {
  const [createProduct, createState] = useCreateProductMutation();

  return {
    onSubmit: async (data: ProductFormData) => {
      try {
        await createProduct(data).unwrap();
      } catch (e) {
        console.error("Ошибка сохранения продукта", e);
      }
    },
    isLoading: createState.isLoading,
  };
};
