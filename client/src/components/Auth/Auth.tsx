import { useQuery } from "@tanstack/react-query";
import { AuthForm } from "../AuthFrom/AuthForm"
import { queryClient } from "../../queryClient";
import { fetchMe } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Auth = () => {

    const meQuery = useQuery({
        queryFn: ()=> fetchMe(),
        queryKey: ["users", "me"],
        retry: 0,
    }, queryClient);

    let navigate = useNavigate()

    useEffect(()=>{
        if(meQuery.status === 'success'){
            navigate('/')
        }
    }, [meQuery.status, navigate])

    switch (meQuery.status) {
        case "pending":
            return <p>Loading...</p>

        case "error":
            return( <>
                <AuthForm/>
                <>error</>
            </>)
        case "success":
            return null
        default:
            return <p>wrong</p>
    }

}

