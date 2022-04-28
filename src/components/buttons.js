import { Link } from "react-router-dom";
import styled from "styled-components";

export const Play = ({ quizId }) => {
    // visible to all users
    return (
        <StyledLink color="var(--green)" hover="var(--green-hover)" to={`/playQuiz/${quizId}`} >Play</StyledLink>
    )
}

export const View = ({ quizId, roles }) => {
    // only render View button if users role is in allowed roles in this case "Admin" or "SuperAdmin"
    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <StyledLink color="var(--blue)" hover="var(--blue-hover)" to={`/viewQuiz/${quizId}`}>View</StyledLink>
        )
    }
}

export const Edit = ({ quizId, roles }) => {
    // only render Edit button if users role is in allowed roles in this case "SuperAdmin"
    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <StyledLink color="var(--turq)" hover="var(--turq-hover)" to={`/editQuiz/${quizId}`}>Edit</StyledLink>
        )
    }
}

const StyledLink = styled(Link)`
    padding: 10px 25px;
    text-decoration: none;
    margin: 10px;
    border-radius: 5px;
    font-weight: 700;
    color: white;
    background-color: ${props => props.color};

    &:hover {
        background-color: ${props => props.hover};
    }
`;