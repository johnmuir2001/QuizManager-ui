import { Link } from "react-router-dom";
import styled from "styled-components";

export const Play = ({ quizId }) => {
    // visible to all users
    return (
        <Link to={`/playQuiz/${quizId}`} >Play</Link>
    )
}