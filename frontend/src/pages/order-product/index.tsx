import { OrderProductPageContent } from "./content";
import { withHomeLayout } from "widgets/layouts/home";

type OrderProductPageProps = {
  params: { uuid: string } | Promise<{ uuid: string }>;
};

const OrderProductPage = async ({ params }: OrderProductPageProps) => {
  const { uuid } = await Promise.resolve(params);
  return <OrderProductPageContent uuid={uuid} />;
};

export default withHomeLayout(OrderProductPage);
