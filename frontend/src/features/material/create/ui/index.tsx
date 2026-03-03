"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { colors, colorsHex } from "shared/constants";
import { units } from "shared/constants/unit";
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
import { Input } from "shared/ui/input";
import { MultiSelect } from "shared/ui/multiselect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shared/ui/select";
import { useCreateMaterialForm } from "../model/useCreateMaterialForm";
import { useCreateMaterialSubmit } from "../model/useCreateMaterialSubmit";

export const CreateMaterialForm = () => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useCreateMaterialForm();

  const { onSubmit, isLoading } = useCreateMaterialSubmit();

  const resetForm = () => {
    reset({
      title: "",
      unit: "PIECE",
      availableColors: [],
      quantityInStock: "0",
      quantityMinimumLevel: "0",
      quantityReserved: "0",
    });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Добавить материал
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Новый материал</DialogTitle>
          <DialogDescription>
            Заполните поля формы чтобы создать новый материал
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data, () => handleOpenChange(false));
          })}
          className="flex flex-col gap-4"
        >
          <Field>
            <FieldLabel>Название</FieldLabel>
            <Input
              {...register("title")}
              placeholder={"Ткань джинсовая"}
              aria-invalid={!!errors.title?.message}
            />
            <FieldError>{errors.title?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Единицы измерения</FieldLabel>
            <Controller
              control={control}
              name="unit"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  aria-invalid={!!errors.unit?.message}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={units.METER} />
                  </SelectTrigger>
                  <SelectContent position="popper" align="end">
                    {Object.entries(units).map(([value, label]) => (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError>{errors.unit?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Доступные цвета</FieldLabel>
            <Controller
              control={control}
              name="availableColors"
              render={({ field }) => (
                <MultiSelect
                  values={Object.entries(colors).map(([value, label]) => ({
                    label,
                    value,
                    colorHex: colorsHex[value as keyof typeof colorsHex],
                  }))}
                  selected={field.value}
                  onValuesChangeAction={field.onChange}
                  aria-invalid={!!errors.availableColors?.message}
                />
              )}
            />
            <FieldError>{errors.availableColors?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>В наличии</FieldLabel>
            <Input
              {...register("quantityInStock")}
              placeholder={"10"}
              aria-invalid={!!errors.quantityInStock?.message}
            />
            <FieldError>{errors.quantityInStock?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Зарезервировано заказами</FieldLabel>
            <Input
              {...register("quantityReserved")}
              placeholder={"10"}
              aria-invalid={!!errors.quantityReserved?.message}
            />
            <FieldError>{errors.quantityReserved?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Минимальное количество</FieldLabel>
            <Input
              {...register("quantityMinimumLevel")}
              placeholder={"10"}
              aria-invalid={!!errors.quantityMinimumLevel?.message}
            />
            <FieldError>{errors.quantityMinimumLevel?.message}</FieldError>
          </Field>

          <Button type="submit" disabled={isLoading}>
            Добавить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
