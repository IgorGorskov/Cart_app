import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Auth } from "../Auth/Auth"
import "./Main.css"
import { ProductList } from "../ProductList/ProductList"
import { fetchProducts } from "../../api/product"
import { useEffect, useState } from "react"
import { Product } from "../ProductCard/ProductCard"

export const Main = () => {
    
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsloading] = useState(true)
    const [isError, setIserror] = useState(false)

    useEffect(()=>{
        const loadProducts = async () => {
            try{
                const prods = await fetchProducts()
                setProducts(prods)
                console.log(products)
                setIserror(false)
            }
            catch(error){
                setIserror(true)
                console.error("error fetch products")
            }
            finally{
                setIsloading(false)
            }
        }
        loadProducts()
    }, [])
    


    return <BrowserRouter>
        <nav>
            <Link className="nav__link" to="/">main</Link>
            <Link className="nav__link" to="/card">card</Link>
            <Link className="nav__link" to="/wishlist">wishlist</Link>
            <Link className="nav__link" to="/user">user</Link>
            <Link className="nav__link" to="/login">login</Link>
        </nav>
        <Routes>
            <Route path="/" element={
                isLoading ? (<p>loading</p>)
                : isError ? (<p>error</p>)
                : (<ProductList products={products || []}/>)
            }></Route>
            <Route path="/cart" element=""></Route>
            <Route path="/wishlist" element=""></Route>
            <Route path="/user" element=""></Route>
            <Route path="/login" element={<Auth/>}></Route>
        </Routes>
    </BrowserRouter>
}
