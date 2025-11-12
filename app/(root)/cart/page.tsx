import CardTable from "./cart-table";
import { getMyCart } from "@/lib/actions/cart.actions";
export const metadata = {
    title: 'Shopping Cart'
}
const CartPage = async () => {
    const cart = await getMyCart();

    return ( <>
    <CardTable cart={cart}></CardTable>
    </> );
}
 
export default CartPage;