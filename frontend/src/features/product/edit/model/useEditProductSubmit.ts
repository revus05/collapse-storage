"use client";

import { useUpdateProductMutation } from "entity/product";
import type { ProductDTO } from "shared/api";
import type { EditProductFormData } from "./schema";

export const useEditProductSubmit = (product: ProductDTO) => {
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  return {
    onSubmit: async (data: EditProductFormData, onSuccess?: () => void) => {
      try {
        await updateProduct({
          uuid: product.uuid,
          body: {
            title: data.title,
            insideColors: data.insideColors,
            outsideColors: data.outsideColors,
            images: data.images,
            materials: data.materials.map((material) => ({
              materialUuid: material.materialUuid,
              quantity: Number(material.quantity),
              color: material.color,
            })),
          },
        }).unwrap();
        onSuccess?.();
      } catch (e) {
        console.error("Ошибка обновления продукта", e);
      }
    },
    isLoading,
  };
};
