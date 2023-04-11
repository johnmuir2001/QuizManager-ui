import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
    const [errMessage, setErrMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const login = await fetch(
            "https://quiz-manager-api.onrender.com/users/authenticate",
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
            await localStorage.setItem("currentUser", JSON.stringify({ token: user.token, role: user.role }))
            navigate("/")
        }
    }
    return (
        <>
            <Header>
                <h1>WebbiSkools</h1>
                <StyleLink to="/">Home</StyleLink>
            </Header>
            <LoginWrap>
                <h1>Log In</h1>
                <LoginForm onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} autoComplete="on" required/>
                    <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} autoComplete="on" required/>
                    <p>{errMessage}</p>
                    <button type="submit">LOG IN</button>
                </LoginForm>
                <LoginCredentials>
                    <fieldset>
                        <legend>Admin:</legend>
                        <p><b>U:</b> admin</p>
                        <p><b>P:</b> admin</p>
                    </fieldset>
                    <fieldset>
                        <legend>Super Admin:</legend>
                        <p><b>U:</b> N/A</p>
                        <p><b>P:</b> N/A</p>
                    </fieldset>
                </LoginCredentials>
            </LoginWrap>
        </>
    )
}

export default Login;

const Header = styled.nav`
    background-color: var(--dark-gray);
    display: flex;
    align-items: center;
    justify-content: space-between;
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

const LoginCredentials = styled.div`
    background-color: #87cfff;
    border: 2px solid var(--blue);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 10px;

    fieldset {
        width: 130px;
        margin: 5px;
    }
    
    p {
        margin: 7px 10px;
    }
`;

const StyleLink = styled(Link)`
    text-decoration: none;
    padding: 15px 50px;
    background-color: var(--dark-gray);
    font-size: 16px;
    color: white;
    font-weight: 700;
    border-radius: 5px;

    &:hover {
        background-color: var(--med-gray)
    }
`;