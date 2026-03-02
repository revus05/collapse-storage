"use client";

import { useCreateOrderMutation } from "entity/order";
import type { OrderFormData } from "./schema";

export const useCreateOrderSubmit = () => {
  const [createOrder, createState] = useCreateOrderMutation();

  return {
    onSubmit: async (data: OrderFormData, onSuccess?: () => void) => {
      try {
        await createOrder({
          products: data.products.map((item) => ({
            productUuid: item.productUuid,
          })),
        }).unwrap();
        onSuccess?.();
      } catch (e) {
        console.error("Ошибка создания заказа", e);
      }
    },
    isLoading: createState.isLoading,
  };
};
