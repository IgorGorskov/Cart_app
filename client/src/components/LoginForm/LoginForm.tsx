import { useMutation } from "@tanstack/react-query"
import { FormEventHandler, useState } from "react"
import { loginUser } from "../../api/user"
import { queryClient } from "../../queryClient"

export const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [message, setMessage] = useState('')

    const loginMutation = useMutation({
        mutationFn: () => loginUser({email, password}),
        onSuccess(){
            queryClient.invalidateQueries({queryKey: ["users", "me"]})
        }
    }, queryClient)

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event)=> {
        event.preventDefault()
        if(email.trim() == ""){
            setMessage('enter the email')
        }

        if(password.trim() == ""){
            setMessage('enter the password')
        }

        loginMutation.mutate()
    }

    return (<>
        <form onSubmit={handleSubmit} className="form" action="" method="post">
            <h2>Login</h2>

            <label htmlFor="email">Email</label>
            <input onChange={(event)=>{setEmail(event.target.value.trim())}} type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input onChange={(event)=>{setPassword(event.target.value.trim())}} type="password" id="password" />
            {message && <p>{message}</p>}
            <button>LogIn</button>
        </form>
    </>)
}