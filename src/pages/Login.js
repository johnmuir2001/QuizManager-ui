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
            <Header>
                <h1>WebbiSkools</h1>
            </Header>
            <LoginWrap>
                <h1>Log In</h1>
                <LoginForm onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} autoComplete="on" required/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="on" required/>
                    <p>{errMessage}</p>
                    <button type="submit">LOG IN</button>
                </LoginForm>
            </LoginWrap>
        </>
    )
}

export default Login;

const Header = styled.nav`
    background-color: var(--dark-gray);
    display: flex;
    align-items: center;
    padding: 0 50px;
    height: 70px;

    h1 {
        color: white;
        font-size: 30px;
    }
`;

const LoginWrap = styled.div`
    margin: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 300px;
        font-size: 15px;
        padding: 10px 20px;
        margin: 10px;
    }

    p {
        margin: 0 0 10px 0;
        height: 20px;
        color: red;
    }

    button {
        background-color: var(--blue);

        &:hover {
            background-color: var(--blue-hover);
        }
    }
`;