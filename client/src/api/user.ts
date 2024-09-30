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
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(user)
    }).then(response => response.json()).catch(error => console.log(error))
}

export async function loginUser (login: Login): Promise<void> {
    return  fetch("http://localhost:3000/login", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login)
    }).then((response) => {response.json(); console.log("successful login", response.status)}).catch(error => console.error(error))
}


export async function fetchMe(){
    const response = await fetch("http://localhost:3000/me",{
        method: "GET",
        credentials: 'include'
    })
    try{
        if(!response.ok){
            throw new Error("no user")
        }
        return response.json()
    }
    catch(error){
        console.error("error fetchMe", error)
    }
}

export async function addProduct(productId: string) {
    return fetch("http://localhost:3000/cart", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({productId})
    }).then(response => response.json()).catch(error => console.error(error));
}


export async function addWish(productId: string) {
    return fetch("http://localhost:3000/wish/add", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({productId})
    }).then(response => response.json()).catch(error => console.error(error));
}

export async function fetchCart() {
    return fetch("http://localhost:3000/cart", {
        method: "GET",
        credentials: "include",
    }).then(response => response.json()).catch(error => console.error("fetchCart: ", error))
}

export async function removeCartProduct(productId: string) {
    await fetch("http://localhost:3000/cart", {
        method: "DELETE",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId })
    }).then(response => response.json()).catch(error => console.log(error))
}