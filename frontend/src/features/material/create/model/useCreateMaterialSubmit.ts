"use client";

import { useCreateMaterialMutation } from "entity/material";
import type { MaterialFormData } from "./schema";

export const useCreateMaterialSubmit = () => {
  const [createMaterial, createState] = useCreateMaterialMutation();

  return {
    onSubmit: async (data: MaterialFormData) => {
      try {
        await createMaterial({
          ...data,
          quantityInStock: +data.quantityInStock,
          quantityReserved: +data.quantityReserved,
          quantityMinimumLevel: +data.quantityMinimumLevel,
        }).unwrap();
      } catch (e) {
        console.error("Ошибка сохранения материала", e);
      }
    },
    isLoading: createState.isLoading,
  };
};
