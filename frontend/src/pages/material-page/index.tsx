import { MaterialPageContent } from "./content";
import { withHomeLayout } from "widgets/layouts/home";

type MaterialPageProps = {
  params: { uuid: string } | Promise<{ uuid: string }>;
};

const MaterialPage = async ({ params }: MaterialPageProps) => {
  const { uuid } = await Promise.resolve(params);
  return <MaterialPageContent uuid={uuid} />;
};

export default withHomeLayout(MaterialPage);
