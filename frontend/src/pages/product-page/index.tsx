import { getMeOnServer } from "entity/user/lib";
import { ProductPageContent } from "./content";
import { withHomeLayout } from "widgets/layouts/home";

type ProductPageProps = {
  params: { uuid: string } | Promise<{ uuid: string }>;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { uuid } = await params;

  const me = await getMeOnServer();
  const isAdmin = me?.role === "ADMIN";

  return <ProductPageContent uuid={uuid} isAdmin={isAdmin} />;
};

export default withHomeLayout(ProductPage);
