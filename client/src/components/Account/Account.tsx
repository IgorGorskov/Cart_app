import { useQuery } from "@tanstack/react-query";
import { AuthForm } from "../AuthFrom/AuthForm"
import { Header } from "../Header/Header"
import { queryClient } from "../../queryClient";
import { fetchMe } from "../../api/user";

export const Account = () => {
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
            return <p>succses</p>
        default:
            return <p>wrong</p>
    }
    
    
}