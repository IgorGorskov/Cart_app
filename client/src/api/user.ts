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

export async function postUser(user: User): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to post user');
        }
    } catch (error) {
        console.error('postUser:', error);
        throw error;
    }
}

export async function loginUser(login: Login): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
    } catch (error) {
        console.error("loginUser:", error);
        throw error;
    }
}

export async function fetchMe(): Promise<User> {
    try {
        const response = await fetch("http://localhost:3000/me", {
            method: "GET",
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch user data');
        }
        return data.user;
    } catch (error) {
        console.error("error fetchMe", error);
        throw error;
    }
}

export async function logoutUser(): Promise<void> {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: "DELETE",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Logout failed');
        }
    } catch (error) {
        console.error("error logoutUser:", error);
        throw error;
    }
}