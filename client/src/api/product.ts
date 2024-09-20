import { Product } from "../components/ProductCard/ProductCard"

export async function fetchProducts(): Promise<Product[]> {
    try{
        const response = await fetch("http://localhost:3000/products")
        if(!response.ok){
            throw new Error
        }
        const data = await response.json()
        return data.products as Product[]
    }
    catch(Error){
        console.error("unknow error")
        return []
    }
}