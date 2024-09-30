import { Product } from "../ProductCard/ProductCard"
import "./WishCard.css"
interface WishCardProps {
    product: Product
}

export const WishCard: React.FC<WishCardProps> = ({ product }) => {
    return <li className="wish__item">
        <img src={product.img} alt="img" />
        <h3>{product.title}</h3>
        <p>{product.cost}</p>
    </li>
}