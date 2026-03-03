import { withHomeLayout } from "widgets/layouts/home";
import { MaterialPageContent } from "./content";

type MaterialPageProps = {
  params: { uuid: string } | Promise<{ uuid: string }>;
};

const MaterialPage = async ({ params }: MaterialPageProps) => {
  const { uuid } = await params;
  return <MaterialPageContent uuid={uuid} />;
};

export default withHomeLayout(MaterialPage);
