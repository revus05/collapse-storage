import { withHomeLayout } from "widgets/layouts/home";
import { OrderProductPageContent } from "./content";

type OrderProductPageProps = {
  params: { uuid: string } | Promise<{ uuid: string }>;
};

const OrderProductPage = async ({ params }: OrderProductPageProps) => {
  const { uuid } = await params;
  return <OrderProductPageContent uuid={uuid} />;
};

export default withHomeLayout(OrderProductPage);
