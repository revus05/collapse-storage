"use client";

import type { FC } from "react";
import type { MaterialDTO } from "shared/api";

type MaterialsListProps = {
  materials: MaterialDTO[];
};

export const MaterialsList: FC<MaterialsListProps> = ({ materials }) => {
  return (
    <section className="flex flex-col gap-4">
      {materials.map((material) => (
        <div
          key={material.uuid}
          className="flex gap-4 border rounded-lg bg-white/10 overflow-hidden"
        >
          <div className="p-4 flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{material.title}</h3>
            <div className="flex flex-col">
              <span>
                <span className="text-white/70">В наличии:</span>{" "}
                {material.quantityInStock}
              </span>
              <span>
                <span className="text-white/70">Зарезервировано:</span>{" "}
                {material.quantityReserved}
              </span>
              <span>
                <span className="text-white/70">Минимальный уровень:</span>{" "}
                {material.quantityMinimumLevel}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
