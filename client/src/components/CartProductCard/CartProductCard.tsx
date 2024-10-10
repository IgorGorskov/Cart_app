import { removeCartProduct } from "../../api/product";
import { queryClient } from "../../queryClient";
import { Product } from "../ProductCard/ProductCard";
import "./CartProudctCard.css"
interface CartProductCardProps {
    product: Product
}

export const CartProductCard:React.FC<CartProductCardProps> = ({ product }) => {
    async function handleRemoveCard(){
        await removeCartProduct(product.id)
        console.log('uploading cart...')
        queryClient.invalidateQueries({ queryKey: ['cart'] })
    }

    return <li className="cart-item">
        <h3 className="cart-item__title title">{product.title}</h3>
        <div style={{display: "flex", alignItems: "center" , textAlign: "center"}}>
            <p className="cart-item__descr">{product.cost}</p>
            <button className="cart-item__button" onClick={handleRemoveCard}>remove</button>
        </div>
    </li>
}