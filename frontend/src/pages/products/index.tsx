import { ProductsContent } from "./content";
import { withHomeLayout } from "widgets/layouts/home";

const ProductsPage = async () => <ProductsContent />;

export default withHomeLayout(ProductsPage);
