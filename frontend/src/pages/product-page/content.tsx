"use client";

import { useGetProductByIdQuery } from "entity/product";
import { EditProductForm } from "features/product/edit";
import Image from "next/image";
import { colors, colorsHex } from "shared/constants/colors";
import { units } from "shared/constants/unit";

type ProductPageContentProps = {
  uuid: string;
  isAdmin: boolean;
};

export const ProductPageContent = ({ uuid, isAdmin }: ProductPageContentProps) => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetProductByIdQuery(uuid);

  if (isLoading || isFetching) {
    return <div className="rounded-xl border p-4 text-white/70">Загрузка продукта...</div>;
  }

  if (isError || !response?.data) {
    return <div className="rounded-xl border p-4 text-red-300">Продукт не найден</div>;
  }

  const product = response.data;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        {isAdmin && <EditProductForm product={product} />}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {product.images.map((image) => (
          <Image
            key={image}
            src={image}
            alt={product.title}
            width={500}
            height={500}
            className="w-full h-56 object-cover rounded-lg border"
          />
        ))}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Цвета продукта</h2>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-white/70">Снаружи:</span>
            {product.outsideColors?.map((color) => (
              <span
                key={`outside-${color}`}
                className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-sm"
              >
                <span
                  className="size-3 rounded-full border"
                  style={{ background: colorsHex[color] }}
                />
                {colors[color]}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-white/70">Внутри:</span>
            {product.insideColors?.map((color) => (
              <span
                key={`inside-${color}`}
                className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-sm"
              >
                <span
                  className="size-3 rounded-full border"
                  style={{ background: colorsHex[color] }}
                />
                {colors[color]}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Материалы для изготовления</h2>
        <div className="flex flex-col gap-2">
          {product.materials.map((material) => (
            <div
              key={material.uuid}
              className="rounded-lg border p-3 flex flex-wrap gap-3 items-center"
            >
              <span className="font-medium">{material.materialTitle}</span>
              <span className="text-white/70">
                {material.quantity} {units[material.materialUnit]}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-sm">
                <span
                  className="size-3 rounded-full border"
                  style={{ background: colorsHex[material.color] }}
                />
                {colors[material.color]}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

