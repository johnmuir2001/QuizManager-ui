import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
    const [errMessage, setErrMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const login = await fetch(
            "http://localhost:4000/users/authenticate",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }
        )
        const user = await login.json();
        if(user.message){
            setErrMessage(user.message)
        }
        if(user.token){
            localStorage.setItem("currentUser", JSON.stringify({ token: user.token, role: user.role }))
            navigate("/")
        }
    }
    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} autoComplete="on" required/>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="on" required/>
                <p>{errMessage}</p>
                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default Login;