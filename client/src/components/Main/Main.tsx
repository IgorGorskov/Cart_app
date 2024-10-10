import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Auth } from "../Auth/Auth"
import "./Main.css"
import { ProductList } from "../ProductList/ProductList"
import { fetchProducts } from "../../api/product"
import { useEffect, useState } from "react"
import { Product } from "../ProductCard/ProductCard"
import { Header } from "../Header/Header"
import { CartProductList } from "../CartProductList/CartProductList"
import { WishList } from "../WishList/WishList"
import { useAuth } from "../../Context"
import { User } from "../User/User"

export const MainContent = () => {
    
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsloading] = useState(true)
    const [isError, setIserror] = useState(false)

    useEffect(()=>{
        const loadProducts = async () => {
            try{
                const prods = await fetchProducts()
                setProducts(prods)
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
    
    const {isAuthed } = useAuth()

    return <BrowserRouter>
                <Header>
                    <nav>
                        <Link className="nav__link" to="/">main</Link>
                        <Link className="nav__link" to="/cart">cart</Link>
                        <Link className="nav__link" to="/wishlist">wishlist</Link>
                        {isAuthed ? <Link className="nav__link" to="/user">user</Link> 
                        : <Link className="nav__link" to="/login">login</Link>}                    
                    </nav>
                </Header>
                
                <Routes>
                    <Route path="/" element={
                        isLoading ? (<p>loading</p>)
                        : isError ? (<p>error</p>)
                        : (<ProductList products={products || []}/>)
                    }></Route>
                    <Route path="/cart" element={<CartProductList/>}></Route>
                    <Route path="/wishlist" element={<WishList/>}></Route>
                    <Route path="/user" element={<User/>}></Route>
                    <Route path="/login" element={<Auth/>}></Route>
                </Routes>
            </BrowserRouter>

}
