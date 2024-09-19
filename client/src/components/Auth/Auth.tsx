import { useQuery } from "@tanstack/react-query";
import { AuthForm } from "../AuthFrom/AuthForm"
import { Header } from "../Header/Header"
import { queryClient } from "../../queryClient";
import { fetchMe } from "../../api/user";

import { useNavigate } from "react-router-dom";


export const Auth = () => {

    const meQuery = useQuery({
        queryFn: ()=> fetchMe(),
        queryKey: ["users", "me"],
        retry: 0,
    }, queryClient);

    let navigate = useNavigate()

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

