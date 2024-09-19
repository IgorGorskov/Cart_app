import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { Auth } from "../Auth/Auth"


export const Main = () => {
    return <BrowserRouter>
        <nav>
            <Link to="/">main</Link>
            <Link to="/card">card</Link>
            <Link to="/wishlist">wishlist</Link>
            <Link to="/user">user</Link>
            <Link to="/login">login</Link>
        </nav>
        <Routes>
            <Route path="/" element=""></Route>
            <Route path="/cart" element=""></Route>
            <Route path="/wishlist" element=""></Route>
            <Route path="/user" element=""></Route>
            <Route path="/login" element={<Auth/>}></Route>
        </Routes>
    </BrowserRouter>
}
