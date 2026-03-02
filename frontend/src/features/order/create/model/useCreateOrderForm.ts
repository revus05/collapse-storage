"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type OrderFormData, orderSchema } from "./schema";

export const useCreateOrderForm = () =>
  useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    mode: "onSubmit",
    defaultValues: {
      products: [{ productUuid: "" }],
    },
  });
