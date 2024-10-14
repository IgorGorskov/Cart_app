import { useQuery } from "@tanstack/react-query";
import { AuthForm } from "../AuthFrom/AuthForm"
import { queryClient } from "../../queryClient";
import { fetchMe } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../Context";


export const Auth = () => {
    const { user } = useAuth()
    const meQuery = useQuery({
        queryFn: ()=> fetchMe(),
        queryKey: ["users", "me"],
        retry: 0,
    }, queryClient);

    let navigate = useNavigate()

    useEffect(()=>{
        if (meQuery.status === 'success' && user) {
            navigate('/');
        }
    }, [meQuery.status, navigate])

    switch (meQuery.status) {
        case "pending":
            return <p>Loading...</p>
        case "error":
            return <AuthForm/>
        case "success":
            return null
        default:
            return <p>wrong</p>
    }

}

