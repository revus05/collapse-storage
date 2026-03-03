import { getMeOnServer } from "entity/user/lib";
import { notFound, redirect } from "next/navigation";
import { paths } from "shared/navigation/paths";
import { withHomeLayout } from "widgets/layouts/home";
import { AdminMaterialRequestsContent } from "./content";

const AdminMaterialRequestsPage = async () => {
  const me = await getMeOnServer();

  if (!me) {
    redirect(paths.signIn);
  }

  if (me.role !== "ADMIN") {
    notFound();
  }

  return <AdminMaterialRequestsContent />;
};

export default withHomeLayout(AdminMaterialRequestsPage);
