"use client";

import { useCreateProductMutation } from "entity/product";
import type { ProductFormData } from "./schema";

export const useCreateProductSubmit = () => {
  const [createProduct, createState] = useCreateProductMutation();

  return {
    onSubmit: async (data: ProductFormData) => {
      try {
        await createProduct({
          title: data.title,
          insideColors: data.insideColors,
          outsideColors: data.outsideColors,
          images: data.images,
          materials: data.materials.map((material) => ({
            materialUuid: material.materialUuid,
            quantity: Number(material.quantity),
            color: material.color,
          })),
        }).unwrap();
      } catch (e) {
        console.error("Ошибка сохранения продукта", e);
      }
    },
    isLoading: createState.isLoading,
  };
};
