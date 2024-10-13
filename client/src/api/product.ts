import { Product } from "../components/ProductCard/ProductCard"

export async function fetchProducts(): Promise<Product[]> {
    try{
        const response = await fetch("http://localhost:3000/products")
        if(!response.ok){
            throw new Error
        }
        const data = await response.json()
        return data.products as Product[]
    }
    catch(Error){
        console.error("unknow error")
        return []
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
    }).then(async (response) => {
        if(!response.ok){
            throw new Error("addProduct erorr")
        }
    }).catch(error => console.error(error));
}

export async function fetchCart() {
    return fetch("http://localhost:3000/cart", {
        method: "GET",
        credentials: "include",
    }).then(async (response) => {
        const data = response.json()
        if(!response.ok){
            throw new Error("fetchCart error")
        }
        return data
    }).catch(error => console.error(error))
}

export async function removeCartProduct(productId: string) {
    await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
        credentials: "include"
    }).then(response => response.json()).catch(error => console.log(error))
}

export async function addWish(product: Product) {
    return fetch("http://localhost:3000/wish", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ product })
    }).then(response => response.json()).catch(error => console.error(error));
}

export async function fetchWish() {
    return fetch("http://localhost:3000/wish", {
        method: "GET",
        credentials: "include",
    }).then(async (response) => {
        const data = response.json()
        if(!response.ok){
            throw new Error("fetchWish error")
        }
        return data
    }).catch(error => console.error(error))
}

export async function removeWish(productId: string) {
    await fetch(`http://localhost:3000/wish/${productId}`, {
        method: "DELETE",
        credentials: "include"
    }).then(response => response.json()).catch(error => console.log(error))
}