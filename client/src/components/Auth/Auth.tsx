import { useQuery } from "@tanstack/react-query";
import { AuthForm } from "../AuthFrom/AuthForm"
import { Header } from "../Header/Header"
import { queryClient } from "../../queryClient";
import { fetchMe } from "../../api/user";

import { useNavigate } from "react-router-dom";

let navigate = useNavigate()
export const Auth = () => {
    const meQuery = useQuery({
        queryFn: ()=> fetchMe(),
        queryKey: ["users", "me"],
        retry: 0,
    }, queryClient);

    switch (meQuery.status) {
        case "pending":
            return <p>Loading...</p>

        case "error":
            return( <>
            <Header/>
            <AuthForm/>
            </>)
        case "success":
            navigate('/')
            return null
        default:
            return <p>wrong</p>
    }
    
    
}

{/* <BrowserRouter>
                <Routes>
                    <Route path="/" element=""></Route>
                    <Route path="/card" element=""></Route>
                    <Route path="/wishlist" element=""></Route>
                    <Route path="/user" element=""></Route>
                </Routes>
            </BrowserRouter> */}