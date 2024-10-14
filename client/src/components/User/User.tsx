import { FC, useEffect } from "react";
import { useAuth } from "../../Context";
import { logoutUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../queryClient";



export const User: FC = () => {
    const { logout, user } = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    function handleClick () {
        logoutUser()
        logout()
        queryClient.invalidateQueries({queryKey: ["users", "me"]});
    }

    
    if(user){
        return <>
            <h3>User</h3>
            <p>{user.name}</p>
            <div>
                <span>{user.userid}</span>
                <span>{user.email}</span>
            </div>
            <button onClick={handleClick}>logout</button>
        </>
    }
    else{
        return <p>need to autorizate</p>
    }
}