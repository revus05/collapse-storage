"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import type { ProductDTO } from "shared/api";
import { paths } from "shared/navigation/paths";

type ProductsListProps = {
  products: ProductDTO[];
};

export const ProductsList: FC<ProductsListProps> = ({ products }) => {
  return (
    <section className="flex flex-col gap-4">
      {products.map((product) => (
        <Link
          href={`${paths.products}/${product.uuid}`}
          key={product.uuid}
          className="flex gap-4"
        >
          <Image
            src={product.images[0]}
            alt={product.title}
            width={400}
            height={400}
            className="w-fit h-32 object-cover rounded-t"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{product.title}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
};
