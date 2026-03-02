import { CreateMaterialForm } from "features/material/create/ui";
import { withHomeLayout } from "widgets/layouts/home";
import { MaterialsList } from "widgets/material/materials-list";

export const MaterialsPage = async () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">Материалы</h1>
        <CreateMaterialForm />
      </div>
      <MaterialsList />
    </div>
  );
};

export default withHomeLayout(MaterialsPage);
