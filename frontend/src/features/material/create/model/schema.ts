import { colorValues } from "shared/constants";
import { unitValues } from "shared/constants/unit";
import z from "zod";

const quantitySchema = z
  .string()
  .trim()
  .refine((val) => !Number.isNaN(Number(val)), {
    message: "Количество должно быть числом",
  })
  .refine((val) => val !== "0", {
    message: "Количество не может быть 0",
  })
  .refine((val) => Number(val) >= 0, {
    message: "Количество не может быть отрицательным",
  });

export const materialSchema = z.object({
  title: z.string().trim().nonempty("Название обязательно"),

  unit: z.enum(unitValues),
  availableColors: z
    .array(z.enum(colorValues))
    .min(1, "Выберите хотя бы один цвет"),

  quantityInStock: quantitySchema,
  quantityReserved: quantitySchema,
  quantityMinimumLevel: quantitySchema,
});

export type MaterialFormData = z.infer<typeof materialSchema>;
