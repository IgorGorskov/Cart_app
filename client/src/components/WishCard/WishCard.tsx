import { Product } from "../ProductCard/ProductCard"
import "./WishCard.css"
import { queryClient } from "../../queryClient"
import { removeWish } from "../../api/user"
interface WishCardProps {
    product: Product
}

export const WishCard: React.FC<WishCardProps> = ({ product }) => {
    async function handleRemove(){
        await removeWish(product.id)
        console.log('uploading wishlist...')
        queryClient.invalidateQueries({ queryKey: ['wish'] })
    }
    return <li className="wish__item">
        <h3>{product.title}</h3>
        <div style={{display:"flex"}}>
            <p style={{padding:"10px"}}>{product.cost}</p>
            <button onClick={handleRemove} style={{padding:"5px"}}>remove</button>
        </div>
    </li>
}