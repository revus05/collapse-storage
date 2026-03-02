import { getMeOnServer } from "entity/user/lib";
import { HomeContent } from "./content";
import { withHomeLayout } from "widgets/layouts/home";

const HomeServerPage = async () => {
  const me = await getMeOnServer();
  const isAdmin = me?.role === "ADMIN";

  return <HomeContent isAdmin={isAdmin} />;
};

export default withHomeLayout(HomeServerPage);
