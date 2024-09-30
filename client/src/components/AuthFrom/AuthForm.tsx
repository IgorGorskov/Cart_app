import { useState } from "react"
import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterFrom } from "../RegisterForm/RegisterForm"
import "./AuthForm.css"

export const AuthForm = ()=>{
    const [auth, setAuth] = useState("login")

    return(<>
        {auth === "login" 
        ? 
        <>
            <LoginForm/> 
            <label htmlFor="changeOnRegister"></label>
            <button id="changeOnRegister" onClick={()=> setAuth("register")}>new account?</button>
        </>
        : 
        <>
            <RegisterFrom/>
            <label htmlFor="changeOnLogin"></label>
            <button id="changeOnLogin" onClick={()=> setAuth("login")}>Login</button>
        </>
        
        }    
        
    </>)
}