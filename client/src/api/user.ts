export interface User {
    userid: string,
    password: string,
    name: string,
    email: string
}

export interface Login{
    email: string,
    password: string,
}

export function postUser (user: User){
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then( async (response) => {
        const data = await response.json()

        if(!response.ok){
            throw new Error(data.erorr)
        }
    })
    .catch((error) => {
        console.error(error)
        throw error
    })
}

export async function loginUser (login: Login): Promise<void> {
    return fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
    }).then( async (response) => {
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.error)
        }
    })
    .catch(error => {
        console.error("loginUser:", error.message)
        throw error
    })
}

export async function fetchMe(): Promise<User>{
    return fetch("http://localhost:3000/me",{
        method: "GET",
        credentials: 'include'
    }).then(async (response) => {
        const data = await response.json()

        if(!response.ok){
            throw new Error(data.erorr)
        }
        return data.user
    })
    .catch((error) => {
        console.log("error fetchMe", error.message)
        throw error
    })
}

export async function logutUser() {
    return fetch('http://localhost:3000/logout', {
        method: "DELETE",
        credentials: "include",

    }).then(async (response) => {
        const data = await response.json()

        if(!response.ok){
            throw data.erorr
        }
    })
    .catch((error) => {
        console.log("error logoutUser:", error)
        throw error
    })
}