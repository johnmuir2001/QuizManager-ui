import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("currentUser");
        navigate("/login")
    }

    return (
        <>
            <h1>WebbiSkools</h1>
            <div>
                <Link to="/">Home</Link>
                <button onClick={handleLogOut}>Log Out</button>
            </div>
        </>
    )
}

export default Nav;