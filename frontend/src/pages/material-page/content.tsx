"use client";

import { useGetMaterialByIdQuery } from "entity/material";
import { colors, colorsHex } from "shared/constants/colors";
import { units } from "shared/constants/unit";

type MaterialPageContentProps = {
  uuid: string;
};

export const MaterialPageContent = ({ uuid }: MaterialPageContentProps) => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetMaterialByIdQuery(uuid);

  if (isLoading || isFetching) {
    return <div className="rounded-xl border p-4 text-white/70">Загрузка материала...</div>;
  }

  if (isError || !response?.data) {
    return <div className="rounded-xl border p-4 text-red-300">Материал не найден</div>;
  }

  const material = response.data;

  return (
    <div className="w-full flex flex-col gap-6">
      <h1 className="text-2xl font-bold">{material.title}</h1>

      <section className="rounded-lg border p-4 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Информация о материале</h2>
        <div className="flex flex-col gap-2">
          <div>
            <span className="text-white/70">Единица измерения:</span>{" "}
            {units[material.unit]}
          </div>
          <div>
            <span className="text-white/70">В наличии:</span>{" "}
            {material.quantityInStock}
          </div>
          <div>
            <span className="text-white/70">Зарезервировано:</span>{" "}
            {material.quantityReserved}
          </div>
          <div>
            <span className="text-white/70">Минимальный уровень:</span>{" "}
            {material.quantityMinimumLevel}
          </div>
        </div>
      </section>

      <section className="rounded-lg border p-4 flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Доступные цвета</h2>
        <div className="flex gap-2 flex-wrap">
          {material.availableColors.map((color) => (
            <span
              key={color}
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
      </section>
    </div>
  );
};

