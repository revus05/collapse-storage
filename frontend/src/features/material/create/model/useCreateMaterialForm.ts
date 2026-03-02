"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type MaterialFormData, materialSchema } from "./schema";

export const useCreateMaterialForm = () =>
  useForm<MaterialFormData>({
    resolver: zodResolver(materialSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      unit: "PIECE",
      availableColors: [],
      quantityInStock: "0",
      quantityMinimumLevel: "0",
      quantityReserved: "0",
    },
  });
