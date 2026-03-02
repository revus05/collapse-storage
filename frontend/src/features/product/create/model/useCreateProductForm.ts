"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ProductFormData, productSchema } from "./schema";

export const useCreateProductForm = () =>
  useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      insideColors: [],
      outsideColors: [],
      images: [],
    },
  });
