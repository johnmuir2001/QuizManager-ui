import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

export const Play = ({ quizId }) => {
    // visible to all users
    return (
        <StyledLink title="Play Quiz" color="var(--green)" hover="var(--green-hover)" to={`/playQuiz/${quizId}`} >Play</StyledLink>
    )
}

export const View = ({ quizId, roles }) => {
    // only render View button if users role is in allowed roles in this case "Admin" or "SuperAdmin"
    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <StyledLink title="View Quiz" color="var(--blue)" hover="var(--blue-hover)" to={`/viewQuiz/${quizId}`}>View</StyledLink>
        )
    }
}

export const Edit = ({ quizId, roles }) => {
    // only render Edit button if users role is in allowed roles in this case "SuperAdmin"
    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <StyledLink title="Edit Quiz" color="var(--turq)" hover="var(--turq-hover)" to={`/editQuiz/${quizId}`}>Edit</StyledLink>
        )
    }
}

export const Delete = ({ fetchData, quizId, roles }) => {
    const handleDeleteQuiz = async () => {
        const deleteQuiz = await fetch(
            `http://localhost:4000/quiz/delete/${quizId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`
                }
            }
        )
        const response = await deleteQuiz.json();
        fetchData()
        if(response.message) {
            alert(response.message)
        }
    }
    // only render Edit button if users role is in allowed roles in this case "SuperAdmin"
    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <DeleteButton onClick={handleDeleteQuiz} title="Delete Quiz">X</DeleteButton>
        )
    }
}

export const AddQuizButton = ({ fetchData, roles }) => {
    const navigate = useNavigate();

    const handleAddQuiz = async () => {
        const addQuiz = await fetch(
            `http://localhost:4000/quiz/addQuiz`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`
                },
                body: JSON.stringify({
                    title: "Untitled Quiz",
                    questions: [
                        {
                            questionText: "QUESTION",
                            answerOptions: [
                                { answerText: "ANSWER", isCorrect: true },
                                { answerText: "ANSWER" },
                                { answerText: "ANSWER" },
                                { answerText: "ANSWER" }
                            ]
                        }
                    ]
                })
            }
        )
        const response = await addQuiz.json();
        // if error message from server, display the message or go back to home page if successful
        if(response.message){
            alert(response.message);
        }
        await fetchData();
        navigate(`/editQuiz/${response._id}`);
    }

    if(roles && roles.indexOf(JSON.parse(localStorage.getItem("currentUser")).role) !== -1){
        return (
            <AddButton onClick={handleAddQuiz} title="Add Quiz">+ Add New Quiz</AddButton>
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

const DeleteButton = styled.button`
    padding: 10px 14px;
    text-decoration: none;
    margin: 10px;
    border-radius: 5px;
    font-weight: 700;
    font-size: 16px;
    color: white;
    background-color: var(--red);

    &:hover {
        background-color: var(--red-hover);
    }
`;

const AddButton = styled.button`
    width: 400px;
    height: 211px;
    margin: 10px;
    border-radius: 10px;
    font-size: 18.72px;
    background-color: var(--blue);

    &:hover {
        background-color: var(--blue-hover);
    }
`;