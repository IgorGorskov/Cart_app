import { useMutation } from "@tanstack/react-query"
import { addProduct, addWish } from "../../api/product"
import "./ProductCard.css"
import { queryClient } from "../../queryClient"

export interface Product {
    id: string,
    title: string,
    img: string,
    cost: string,
}

interface ProductCardProps {
    product: Product
}

export const ProductCard: React.FC<ProductCardProps>  = ( {product} ) => {

    const cartMutation = useMutation({
        mutationFn: () => addProduct(product.id),
        onSuccess(){
            queryClient.invalidateQueries({queryKey: ["cart"]})
        }
    }, queryClient)

    const wishMutation = useMutation({
        mutationFn: () => addWish(product),
        onSuccess(){
            queryClient.invalidateQueries({queryKey: ["wish"]})
        }
    }, queryClient)

    function addToBuyCart() {
        cartMutation.mutate()
    }

    function addToWishList() {
        wishMutation.mutate()
    }

    return <li className="product-card">
        <img src={product.img} alt="img_prod" />
        <h3>{product.title}</h3>
        <p>{product.cost} $</p>
        <div className="proudct__buttonbox" style={{display: "flex"}}>
            <button className="proudct__button" onClick={addToBuyCart}>buy</button>
            <button className="proudct__button" onClick={addToWishList}>wish</button>
        </div>
    </li>
}