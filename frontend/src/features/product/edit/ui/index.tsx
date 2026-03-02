"use client";

import { useGetAllMaterialsQuery } from "entity/material";
import { useCloudinaryUpload } from "features/file/upload";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray } from "react-hook-form";
import type { ProductDTO } from "shared/api";
import { colors, colorsHex } from "shared/constants";
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
import { useEditProductForm } from "../model/useEditProductForm";
import { useEditProductSubmit } from "../model/useEditProductSubmit";

type EditProductFormProps = {
  product: ProductDTO;
};

export const EditProductForm = ({ product }: EditProductFormProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: materialsResponse } = useGetAllMaterialsQuery();
  const { uploadFiles, isLoading: isUploading } = useCloudinaryUpload();
  const { onSubmit, isLoading } = useEditProductSubmit(product);
  const materials = materialsResponse?.data ?? [];

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    resetToProduct,
    control,
    formState: { errors },
  } = useEditProductForm(product);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const images = watch("images");

  const handleUploadImages = async (files: FileList | null) => {
    const uploadedFiles = await uploadFiles(files);
    setValue("images", [...getValues("images"), ...uploadedFiles], {
      shouldValidate: true,
    });
  };

  const removeImage = (url: string) => {
    setValue(
      "images",
      getValues("images").filter((item) => item !== url),
      { shouldValidate: true },
    );
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    resetToProduct();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil />
          Редактировать
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-h-[90svh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Редактирование продукта</DialogTitle>
          <DialogDescription>
            Обновите информацию о продукте и сохраните изменения
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data, () => {
              handleOpenChange(false);
              router.refresh();
            });
          })}
          className="flex flex-col gap-4"
        >
          <Field>
            <FieldLabel>Название</FieldLabel>
            <Input
              {...register("title")}
              aria-invalid={!!errors.title?.message}
            />
            <FieldError>{errors.title?.message}</FieldError>
          </Field>

          <Field>
            <FieldLabel>Цвет сумки</FieldLabel>
            <Controller
              control={control}
              name="outsideColors"
              render={({ field }) => (
                <MultiSelect
                  values={Object.entries(colors).map(([value, label]) => ({
                    label,
                    value,
                    colorHex: colorsHex[value as keyof typeof colorsHex],
                  }))}
                  selected={field.value}
                  onValuesChangeAction={field.onChange}
                />
              )}
            />
          </Field>

          <Field>
            <FieldLabel>Цвет подкладки</FieldLabel>
            <Controller
              control={control}
              name="insideColors"
              render={({ field }) => (
                <MultiSelect
                  values={Object.entries(colors).map(([value, label]) => ({
                    label,
                    value,
                    colorHex: colorsHex[value as keyof typeof colorsHex],
                  }))}
                  selected={field.value}
                  onValuesChangeAction={field.onChange}
                />
              )}
            />
          </Field>

          <Field>
            <FieldLabel>Связи с материалами</FieldLabel>
            <div className="flex flex-col gap-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-md border border-input p-3 flex flex-col gap-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Связь #{index + 1}
                    </span>
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
                    name={`materials.${index}.materialUuid`}
                    render={({ field: selectField }) => (
                      <Select
                        value={selectField.value}
                        onValueChange={selectField.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Выберите материал" />
                        </SelectTrigger>
                        <SelectContent position="popper" align="end">
                          {materials.map((material) => (
                            <SelectItem
                              key={material.uuid}
                              value={material.uuid}
                            >
                              {material.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />

                  <Input
                    {...register(`materials.${index}.quantity`)}
                    placeholder="Количество"
                  />

                  <Controller
                    control={control}
                    name={`materials.${index}.color`}
                    render={({ field: selectField }) => (
                      <Select
                        value={selectField.value}
                        onValueChange={selectField.onChange}
                      >
                        <SelectTrigger className="w-full">
                          {selectField.value ? (
                            <span className="inline-flex items-center gap-2">
                              <span
                                className="size-3 rounded-full border"
                                style={{
                                  background:
                                    colorsHex[
                                      selectField.value as keyof typeof colorsHex
                                    ],
                                }}
                              />
                              {colors[selectField.value as keyof typeof colors]}
                            </span>
                          ) : (
                            <SelectValue placeholder="Выберите цвет" />
                          )}
                        </SelectTrigger>
                        <SelectContent position="popper" align="end">
                          {Object.entries(colors).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              <span
                                className="size-3 rounded-full border"
                                style={{
                                  background:
                                    colorsHex[value as keyof typeof colorsHex],
                                }}
                              />
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({ materialUuid: "", quantity: "1", color: "BLACK" })
                }
              >
                Добавить еще связь
              </Button>
            </div>
          </Field>

          <Field>
            <FieldLabel>Изображения</FieldLabel>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleUploadImages(e.target.files)}
            />
          </Field>

          <div className="flex gap-2 flex-wrap">
            {images.map((img) => (
              <div key={img} className="relative">
                <Image
                  src={img}
                  width={60}
                  height={100}
                  alt="product image"
                  className="w-24 h-24 object-cover rounded"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-600 text-white px-1"
                  onClick={() => removeImage(img)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <Button type="submit" disabled={isLoading || isUploading}>
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
