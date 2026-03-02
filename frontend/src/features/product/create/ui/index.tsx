"use client";

import { useGetAllMaterialsQuery } from "entity/material";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Controller, useFieldArray } from "react-hook-form";
import { colors } from "shared/constants";
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
import { Textarea } from "shared/ui/textarea";
import { useCreateProductForm } from "../model/useCreateProductForm";
import { useCreateProductSubmit } from "../model/useCreateProductSubmit";
import { useImageUpload } from "../model/useImageUpload";

export const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    control,
  } = useCreateProductForm();
  const { data: materialsResponse } = useGetAllMaterialsQuery();
  const materials = materialsResponse?.data ?? [];

  const {
    fields,
    append,
    remove: removeMaterialLink,
  } = useFieldArray({
    control,
    name: "materials",
  });

  const images = watch("images");

  const { onSubmit, isLoading } = useCreateProductSubmit();

  const {
    upload,
    remove,
    isLoading: isUploading,
  } = useImageUpload(setValue, getValues);

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
            Добавить продукт
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-h-[90svh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Новый продукт</DialogTitle>
            <DialogDescription>
              Заполните поля формы чтобы создать новый продукт в магазине
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Field>
              <FieldLabel>Название</FieldLabel>
              <Input
                {...register("title")}
                placeholder={"Сумка KARMA"}
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
                    }))}
                    selected={field.value}
                    onValuesChangeAction={field.onChange}
                    aria-invalid={!!errors.outsideColors?.message}
                  />
                )}
              />
              <FieldError>{errors.outsideColors?.message}</FieldError>
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
                    }))}
                    selected={field.value}
                    onValuesChangeAction={field.onChange}
                    aria-invalid={!!errors.insideColors?.message}
                  />
                )}
              />
              <FieldError>{errors.insideColors?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Описание</FieldLabel>
              <Textarea
                {...register("description")}
                placeholder={"Описание"}
                aria-invalid={!!errors.description?.message}
                className="max-h-64"
              />
              <FieldError>{errors.description?.message}</FieldError>
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
                          onClick={() => removeMaterialLink(index)}
                        >
                          Удалить
                        </Button>
                      )}
                    </div>

                    <Field>
                      <FieldLabel>Материал</FieldLabel>
                      <Controller
                        control={control}
                        name={`materials.${index}.materialUuid`}
                        render={({ field: selectField }) => (
                          <Select
                            value={selectField.value}
                            onValueChange={selectField.onChange}
                          >
                            <SelectTrigger
                              aria-invalid={
                                !!errors.materials?.[index]?.materialUuid
                                  ?.message
                              }
                              className="w-full"
                            >
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
                      <FieldError>
                        {errors.materials?.[index]?.materialUuid?.message}
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Количество материала</FieldLabel>
                      <Input
                        {...register(`materials.${index}.quantity`)}
                        placeholder="1"
                        aria-invalid={
                          !!errors.materials?.[index]?.quantity?.message
                        }
                      />
                      <FieldError>
                        {errors.materials?.[index]?.quantity?.message}
                      </FieldError>
                    </Field>

                    <Field>
                      <FieldLabel>Цвет материала</FieldLabel>
                      <Controller
                        control={control}
                        name={`materials.${index}.color`}
                        render={({ field: selectField }) => (
                          <Select
                            value={selectField.value}
                            onValueChange={selectField.onChange}
                          >
                            <SelectTrigger
                              aria-invalid={
                                !!errors.materials?.[index]?.color?.message
                              }
                              className="w-full"
                            >
                              <SelectValue placeholder="Выберите цвет" />
                            </SelectTrigger>
                            <SelectContent position="popper" align="end">
                              {Object.entries(colors).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FieldError>
                        {errors.materials?.[index]?.color?.message}
                      </FieldError>
                    </Field>
                  </div>
                ))}

                <FieldError>{errors.materials?.message}</FieldError>

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
                onChange={(e) => upload(e.target.files)}
                aria-invalid={!!errors.images?.message}
              />
              <FieldError>{errors.images?.message}</FieldError>
            </Field>

            <div className="flex gap-2 flex-wrap">
              {images?.map((img) => (
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
                    onClick={() => remove(img)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <Button type="submit" disabled={isLoading || isUploading}>
              Добавить
            </Button>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};
