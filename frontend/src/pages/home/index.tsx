import { HomePage } from "pages/home/ui";
import { withHomeLayout } from "widgets/layouts/home";

const HomeServerPage = async () => {
  return <HomePage />;
};

export default withHomeLayout(HomeServerPage);
