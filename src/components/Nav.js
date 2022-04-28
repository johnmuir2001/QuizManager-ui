import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
    const navigate = useNavigate();

    // log out removes token and role from local storage and redirects to log in page
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