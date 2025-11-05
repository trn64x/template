// fun fact możesz robić promise np zeby sprawdzic loader.tsx ->  const delay = (ms)=> new Promise((resolve)=> setTimeout(resolve, ms))
import { getLatestProducts } from "@/lib/actions/product.actions";
import ProductList from "@/components/shared/product/product-list";
export default async function Homepage() {
  const LatestProducts = await getLatestProducts();
  return (
<><ProductList data={LatestProducts} title='Newest Arrivals' limit={4}/></>
  );
}
