import { colorValues } from "shared/constants";
import z from "zod";

export const productSchema = z.object({
  title: z.string().trim().nonempty("Название обязательно"),
  description: z.string().trim().nonempty("Описание обязательно"),

  insideColors: z
    .array(z.enum(colorValues))
    .min(1, "Выберите хотя бы один цвет"),
  outsideColors: z
    .array(z.enum(colorValues))
    .min(1, "Выберите хотя бы один цвет"),

  images: z.array(z.url()).min(1, "Загрузите изображение"),
});

export type ProductFormData = z.infer<typeof productSchema>;
