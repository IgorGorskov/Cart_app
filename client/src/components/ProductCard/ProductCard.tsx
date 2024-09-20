import "./ProductCard.css"

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

    function addToBuyCart() {
        
    }

    function addToWishList() {
        
    }

    return <li className="product-card">
        <img src={product.img} alt="img_prod" />
        <h3>{product.title}</h3>
        <p>{product.cost}</p>
        <div style={{display: "flex"}}>
            <button onClick={addToBuyCart}>buy</button>
            <button onClick={addToWishList}>wish</button>
        </div>
    </li>
}