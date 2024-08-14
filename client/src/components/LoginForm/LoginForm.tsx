
export const LoginForm = () => {
    return (<>
        <form className="form" action="" method="post">
            <h2>Login</h2>

            <label htmlFor="email">Email</label>
            <input type="email" id="email" />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
            <button>LogIn</button>
        </form>
    </>)
}