export interface User {
    userid: string,
    password: string,
    name: string,
    email: string
}

export function postUser (user: User){
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

