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
        <NavWrap>
            <h1>WebbiSkools</h1>
            <NavButtons>
                <StyleLink to="/">Home</StyleLink>
                <button onClick={handleLogOut}>Log Out</button>
            </NavButtons>
        </NavWrap>
    )
}

export default Nav;

const NavWrap = styled.nav`
    background-color: var(--dark-gray);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    height: 70px;

    h1 {
        color: white;
        font-size: 30px;
    }
`;

const NavButtons = styled.div`
    button {
        padding: 15px 50px;
        background-color: var(--dark-gray);
        font-size: 16px;

        &:hover {
            background-color: var(--med-gray)
        }
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