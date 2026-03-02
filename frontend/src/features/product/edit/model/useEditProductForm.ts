"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ProductDTO } from "shared/api";
import { useForm } from "react-hook-form";
import { type EditProductFormData, editProductSchema } from "./schema";

const getDefaultValues = (product: ProductDTO): EditProductFormData => ({
  title: product.title,
  insideColors: product.insideColors,
  outsideColors: product.outsideColors,
  images: product.images,
  materials: product.materials.map((material) => ({
    materialUuid: material.materialUuid,
    quantity: String(material.quantity),
    color: material.color,
  })),
});

export const useEditProductForm = (product: ProductDTO) => {
  const form = useForm<EditProductFormData>({
    resolver: zodResolver(editProductSchema),
    mode: "onSubmit",
    defaultValues: getDefaultValues(product),
  });

  return {
    ...form,
    resetToProduct: () => form.reset(getDefaultValues(product)),
  };
};
