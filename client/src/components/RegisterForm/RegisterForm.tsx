import { useState } from "react"
import { postUser } from "../../api/user"

export const RegisterFrom = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confpass, setConfpass] = useState("")

    const [message, setMessage] = useState("")

    function handleSubmit(){
        if (confpass == password){
            postUser({name, email, password, userid: crypto.randomUUID()})
        }
        else{
            setMessage('Passwords not matched')
        }
    }

    return (<>
        <form onSubmit={handleSubmit} className="form" action="" method="post">
            <h2>Singup</h2>
            <label htmlFor="name">Name</label>
            <input onChange={(event)=>setName(event.target.value)} type="text" id="name"/>

            <label htmlFor="email">Email</label>
            <input onChange={(event)=>setEmail(event.target.value)} type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input onChange={(event)=>setPassword(event.target.value)} type="password" id="password" />

            <label htmlFor="conf-password">Confirm password</label>
            <input onChange={(event)=>setConfpass(event.target.value)} type="password" id="conf-password" />
            {message != "" } : <p>{message}</p> ? <></>  
            <button>Singup</button>
        </form>
    </>)
}