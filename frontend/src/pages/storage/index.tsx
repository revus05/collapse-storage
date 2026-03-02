import { makeStore } from "app/store";
import { materialApi } from "entity/material";
import { CreateMaterialForm } from "features/material/create/ui";
import { withHomeLayout } from "widgets/layouts/home";
import { MaterialsList } from "widgets/material/materials-list";

export const Storage = async () => {
  const store = makeStore();

  store.dispatch(materialApi.endpoints.getAllMaterials.initiate());

  await Promise.all(store.dispatch(materialApi.util.getRunningQueriesThunk()));

  const state = store.getState();

  const response = materialApi.endpoints.getAllMaterials.select()(state)?.data;

  const materials = response?.data;

  if (!materials) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Продукты</h1>
        <CreateMaterialForm />
      </div>
      <MaterialsList materials={materials} />
    </div>
  );
};

export default withHomeLayout(Storage);
