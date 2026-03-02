"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { ProductDTO } from "shared/api";
import { colorsHex } from "shared/constants/colors";
import { units } from "shared/constants/unit";
import { paths } from "shared/navigation/paths";

type ProductsListProps = {
  products: ProductDTO[];
};

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <section className="flex flex-col gap-4">
      {products.map((product) => {
        const visibleMaterials = product.materials.slice(0, 2);
        const hiddenCount = Math.max(product.materials.length - 2, 0);

        return (
          <Link
            href={`${paths.products}/${product.uuid}`}
            key={product.uuid}
            className="flex gap-4 border rounded-lg bg-white/10 overflow-hidden"
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              width={400}
              height={400}
              className="w-fit h-32 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <div className="flex flex-col gap-1">
                {visibleMaterials.map((material) => (
                  <div key={material.uuid} className="flex gap-2 items-center">
                    <span className="text-white/70">{material.materialTitle}</span>
                    <span>-</span>
                    <span>
                      {material.quantity}{" "}
                      <span className="text-white/70">
                        {units[material.materialUnit]}
                      </span>
                    </span>
                    <div
                      className="rounded-full size-6 border"
                      style={{ background: colorsHex[material.color] }}
                    ></div>
                  </div>
                ))}
                {hiddenCount > 0 && (
                  <span className="text-white/70 text-sm">+ {hiddenCount}</span>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  );
};
