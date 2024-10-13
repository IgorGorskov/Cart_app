import { useState } from "react"
import { LoginForm } from "../LoginForm/LoginForm"
import { RegisterFrom } from "../RegisterForm/RegisterForm"
import "./AuthForm.css"

export const AuthForm = ()=>{
    const [auth, setAuth] = useState("login")

    return(<div className="auth">
        {auth === "login" 
        ? 
        <>
            <LoginForm/> 
            <label htmlFor="changeOnRegister"></label>
            <button className="auth__chandge-button" id="changeOnRegister" onClick={()=> setAuth("register")}>new account?</button>
        </>
        : 
        <>
            <RegisterFrom/>
            <label htmlFor="changeOnLogin"></label>
            <button className="auth__chandge-button" id="changeOnLogin" onClick={()=> setAuth("login")}>Login</button>
        </>
        
        }    
        
    </div>)
}