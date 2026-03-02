"use client";

import { useGetAllMaterialRestockRequestsQuery } from "entity/material-restock-request";

export const AdminMaterialRequestsContent = () => {
  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useGetAllMaterialRestockRequestsQuery();

  if (isLoading || isFetching) {
    return <div className="rounded-xl border p-4 text-white/70">Загрузка заявок...</div>;
  }

  if (isError || !response) {
    return <div className="rounded-xl border p-4 text-red-300">Не удалось загрузить заявки</div>;
  }

  const requests = response.data ?? [];

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Заявки на пополнение</h1>

      {requests.length === 0 && (
        <div className="rounded-xl border p-4 text-white/70">Заявок пока нет</div>
      )}

      <div className="flex flex-col gap-2">
        {requests.map((request) => (
          <div key={request.uuid} className="rounded-xl border p-4 flex flex-col gap-1">
            <span className="font-medium">{request.materialTitle}</span>
            <span className="text-sm text-white/70">
              Продукт: {request.productTitle}
            </span>
            <span className="text-sm text-white/70">
              Заказ: {request.orderUuid}
            </span>
            <span className="text-sm text-white/70">
              Создано: {new Date(request.createdAt).toLocaleString("ru-RU")}
            </span>
            <span className="text-sm text-white/70">
              Инициатор: {request.requestedByUserName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

