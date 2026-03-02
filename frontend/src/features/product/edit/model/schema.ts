import { colorValues } from "shared/constants";
import z from "zod";

const materialLinkSchema = z.object({
  materialUuid: z.string().trim().nonempty("Выберите материал"),
  quantity: z
    .string()
    .trim()
    .refine((val) => !Number.isNaN(Number(val)), {
      message: "Количество должно быть числом",
    })
    .refine((val) => Number(val) > 0, {
      message: "Количество должно быть больше 0",
    }),
  color: z.enum(colorValues),
});

export const editProductSchema = z.object({
  title: z.string().trim().nonempty("Название обязательно"),
  insideColors: z
    .array(z.enum(colorValues))
    .min(1, "Выберите хотя бы один цвет"),
  outsideColors: z
    .array(z.enum(colorValues))
    .min(1, "Выберите хотя бы один цвет"),
  images: z.array(z.url()).min(1, "Загрузите изображение"),
  materials: z
    .array(materialLinkSchema)
    .min(1, "Добавьте хотя бы одну связь с материалом"),
});

export type EditProductFormData = z.infer<typeof editProductSchema>;
