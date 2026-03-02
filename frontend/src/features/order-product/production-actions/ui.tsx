"use client";

import {
  useCreateMaterialRestockRequestMutation,
} from "entity/material-restock-request";
import { materialApi } from "entity/material";
import { useUpdateOrderProductStatusMutation } from "entity/order";
import { useRouter } from "next/navigation";
import type { OrderProductDTO } from "shared/api";
import { colors, colorsHex, productionStatuses, units } from "shared/constants";
import { useAppDispatch } from "shared/lib";
import { Button } from "shared/ui/button";
import { Input } from "shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "shared/ui/select";
import { useState } from "react";

type ProductionActionsProps = {
  orderProduct: OrderProductDTO;
};

export const ProductionActions = ({ orderProduct }: ProductionActionsProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [status, setStatus] = useState(orderProduct.status);
  const [usePlannedAmounts, setUsePlannedAmounts] = useState(true);
  const [customAmounts, setCustomAmounts] = useState<Record<string, number>>({});
  const [updateStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderProductStatusMutation();
  const [createRestockRequest, { isLoading: isCreatingRequest }] =
    useCreateMaterialRestockRequestMutation();

  const saveStatus = async () => {
    const materialUsages =
      status === "DONE"
        ? orderProduct.product.materials.map((material) => ({
            productMaterialUuid: material.uuid,
            quantity: usePlannedAmounts
              ? material.quantity
              : customAmounts[material.uuid] ?? material.quantity,
          }))
        : undefined;

    await updateStatus({
      uuid: orderProduct.uuid,
      body: { status, materialUsages },
    }).unwrap();

    if (status === "DONE") {
      dispatch(
        materialApi.util.invalidateTags([
          { type: "materials", id: "LIST" },
          ...orderProduct.product.materials.map((material) => ({
            type: "materials" as const,
            id: material.materialUuid,
          })),
        ]),
      );
    }

    router.refresh();
  };

  const requestRestock = async (materialUuid: string) => {
    await createRestockRequest({
      orderProductUuid: orderProduct.uuid,
      materialUuid,
    }).unwrap();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border p-4 flex flex-col gap-3">
        <h2 className="font-semibold">Статус изготовления</h2>
        <div className="flex items-center gap-2">
          <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
            <SelectTrigger className="w-full max-w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(productionStatuses).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={saveStatus} disabled={isUpdatingStatus}>
            Сохранить
          </Button>
        </div>

        {status === "DONE" && (
          <div className="rounded-lg border p-3 flex flex-col gap-3">
            <span className="text-sm text-white/80">
              Использовано плановое количество материалов?
            </span>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={usePlannedAmounts ? "default" : "outline"}
                onClick={() => setUsePlannedAmounts(true)}
              >
                Да
              </Button>
              <Button
                type="button"
                size="sm"
                variant={!usePlannedAmounts ? "default" : "outline"}
                onClick={() => setUsePlannedAmounts(false)}
              >
                Нет, укажу вручную
              </Button>
            </div>

            {!usePlannedAmounts && (
              <div className="flex flex-col gap-2">
                {orderProduct.product.materials.map((material) => (
                  <label key={material.uuid} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-white/80">
                      {material.materialTitle} ({units[material.materialUnit]})
                    </span>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      value={customAmounts[material.uuid] ?? material.quantity}
                      onChange={(event) =>
                        setCustomAmounts((previous) => ({
                          ...previous,
                          [material.uuid]: Number(event.target.value),
                        }))
                      }
                      className="max-w-32"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-xl border p-4 flex flex-col gap-3">
        <h2 className="font-semibold">Необходимые материалы</h2>
        <div className="flex flex-col gap-2">
          {orderProduct.product.materials.map((material) => (
            <div
              key={material.uuid}
              className="rounded-lg border p-3 flex items-center justify-between gap-3"
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{material.materialTitle}</span>
                <span className="text-sm text-white/70">
                  {material.quantity} {units[material.materialUnit]}
                </span>
                <span className="inline-flex items-center gap-2 text-sm text-white/70">
                  <span
                    className="size-3 rounded-full border"
                    style={{ background: colorsHex[material.color] }}
                  />
                  {colors[material.color]}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => requestRestock(material.materialUuid)}
                disabled={isCreatingRequest}
              >
                Запросить пополнение
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
