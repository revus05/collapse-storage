"use client";

import { useGetAllProductsQuery } from "entity/product";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Button } from "shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "shared/ui/dialog";
import { Field, FieldError, FieldLabel } from "shared/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shared/ui/select";
import { useCreateOrderForm } from "../model/useCreateOrderForm";
import { useCreateOrderSubmit } from "../model/useCreateOrderSubmit";

export const CreateOrderForm = () => {
  const [open, setOpen] = useState(false);
  const { data: productsResponse } = useGetAllProductsQuery();
  const products = productsResponse?.data ?? [];

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useCreateOrderForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const { onSubmit, isLoading } = useCreateOrderSubmit();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      reset({ products: [{ productUuid: "" }] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Создать заказ
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-h-[90svh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Новый заказ</DialogTitle>
          <DialogDescription>
            Добавьте продукты, которые входят в заказ
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data, () => handleOpenChange(false));
          })}
          className="flex flex-col gap-4"
        >
          <Field>
            <FieldLabel>Продукты в заказе</FieldLabel>
            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-md border border-input p-3 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Продукт #{index + 1}</span>
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        Удалить
                      </Button>
                    )}
                  </div>

                  <Controller
                    control={control}
                    name={`products.${index}.productUuid`}
                    render={({ field: selectField }) => (
                      <Select
                        value={selectField.value}
                        onValueChange={selectField.onChange}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={
                            !!errors.products?.[index]?.productUuid?.message
                          }
                        >
                          <SelectValue placeholder="Выберите продукт" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.uuid} value={product.uuid}>
                              {product.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError>
                    {errors.products?.[index]?.productUuid?.message}
                  </FieldError>
                </div>
              ))}

              <FieldError>{errors.products?.message}</FieldError>

              <Button
                type="button"
                variant="outline"
                onClick={() => append({ productUuid: "" })}
              >
                Добавить продукт
              </Button>
            </div>
          </Field>

          <Button type="submit" disabled={isLoading}>
            Создать
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
