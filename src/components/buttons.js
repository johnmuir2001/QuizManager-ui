import { Link } from "react-router-dom";
import styled from "styled-components";

export const Play = ({ quizId }) => {
    // visible to all users
    return (
        <Link to={`/playQuiz/${quizId}`} >Play</Link>
    )
}

export const View = ({ quizId, roles }) => {
    // only render View button if users role is in allowed roles in this case "Admin" or "SuperAdmin"
    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <Link to={`/viewQuiz/${quizId}`}>View</Link>
        )
    }
}

export const Edit = ({ quizId, roles }) => {
    // only render Edit button if users role is in allowed roles in this case "SuperAdmin"
    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <Link to={`/editQuiz/${quizId}`}>Edit</Link>
        )
    }
}