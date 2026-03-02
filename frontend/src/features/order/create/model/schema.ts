import z from "zod";

const orderProductSchema = z.object({
  productUuid: z.string().trim().nonempty("Выберите продукт"),
});

export const orderSchema = z.object({
  products: z.array(orderProductSchema).min(1, "Добавьте хотя бы один продукт"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
