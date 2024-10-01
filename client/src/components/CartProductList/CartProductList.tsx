
import { fetchCart } from "../../api/user"
import { CartProductCard } from "../CartProductCard/CartProductCard"
import "./CartProductList.css"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../queryClient"
import { Product } from "../ProductCard/ProductCard"


export const CartProductList: React.FC = () => {
    const {isLoading, isError, data} = useQuery({queryFn: () => fetchCart(), queryKey: ['cart']}, queryClient)

    const cart: Product[] = data?.cart ?? []
    const finalPrice = data?.finalPrice ?? 0

    if(isLoading){
        return <>loading...</>
    }
    if(isError){
        return <>error...</>
    }
    if(cart.length !== 0){
        return <>
            <h2 className="cart__title">Cart</h2>
            <ul className="cart__list">
                {cart.map(product => <CartProductCard key={product.id} product={product}/>)}
            </ul>
            <p>final price: {finalPrice}</p>
            <button>Order</button>
        </>
    }
    else{
        return<>
            Cart is empty
        </>
    }
}