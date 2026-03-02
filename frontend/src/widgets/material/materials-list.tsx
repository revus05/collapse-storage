"use client";

import { useGetAllMaterialsQuery } from "entity/material";
import Link from "next/link";
import { colors, colorsHex } from "shared/constants";
import { units } from "shared/constants/unit";
import { paths } from "shared/navigation/paths";

export const MaterialsList = () => {
  const { data: response } = useGetAllMaterialsQuery();

  if (!response) return null;

  const { data: materials } = response;

  return (
    <section className="flex flex-col gap-4">
      {materials.map((material) => (
        <Link
          href={`${paths.materials}/${material.uuid}`}
          key={material.uuid}
          className="rounded-xl border bg-white/5 p-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold leading-tight">
                  {material.title}
                </h3>
                <span className="text-sm text-white/60">
                  Ед. изм.: {units[material.unit]}
                </span>
              </div>
              <span className="text-xs px-2 py-1 rounded-full border text-white/70">
                {material.availableColors.length} цветов
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="rounded-lg border bg-black/10 px-3 py-2">
                <div className="text-white/60 text-xs truncate">В наличии</div>
                <div className="font-medium">{material.quantityInStock}</div>
              </div>
              <div className="rounded-lg border bg-black/10 px-3 py-2">
                <div className="text-white/60 text-xs truncate">
                  Зарезервировано
                </div>
                <div className="font-medium">{material.quantityReserved}</div>
              </div>
              <div className="rounded-lg border bg-black/10 px-3 py-2">
                <div className="text-white/60 text-xs truncate">
                  Мин. уровень
                </div>
                <div className="font-medium">
                  {material.quantityMinimumLevel}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {material.availableColors.slice(0, 5).map((color) => (
                <span
                  key={`${material.uuid}-${color}`}
                  className="inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs"
                >
                  <span
                    className="size-3 rounded-full border"
                    style={{ background: colorsHex[color] }}
                  />
                  {colors[color]}
                </span>
              ))}
              {material.availableColors.length > 5 && (
                <span className="text-xs text-white/60">
                  +{material.availableColors.length - 5}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};
