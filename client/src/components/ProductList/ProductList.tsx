import { Product, ProductCard } from "../ProductCard/ProductCard"
import "./ProductList.css"


interface ProductListProps {
    products: Product[]
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
    
    return <>
        <h2 className="proudct__title">Products</h2>
        <ul className="product-list">
            {products.map(product => <ProductCard key={product.id} product={product}/>)}
        </ul>
    </>
}