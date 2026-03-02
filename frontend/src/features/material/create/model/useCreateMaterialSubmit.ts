"use client";

import { useCreateMaterialMutation } from "entity/material";
import type { MaterialFormData } from "./schema";

export const useCreateMaterialSubmit = () => {
  const [createMaterial, createState] = useCreateMaterialMutation();

  return {
    onSubmit: async (data: MaterialFormData, onSuccess?: () => void) => {
      try {
        await createMaterial({
          ...data,
          quantityInStock: +data.quantityInStock,
          quantityReserved: +data.quantityReserved,
          quantityMinimumLevel: +data.quantityMinimumLevel,
        }).unwrap();
        onSuccess?.();
      } catch (e) {
        console.error("Ошибка сохранения материала", e);
      }
    },
    isLoading: createState.isLoading,
  };
};
