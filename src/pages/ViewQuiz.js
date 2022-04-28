import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import styled from "styled-components";

const ViewQuiz = () => {
    const [currentQuiz, setCurrentQuiz] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // quiz id from the url
    const { id } = useParams();

    // gets quiz by id on page load
    useEffect(() => {
        const fetchData = async () => {
            const fetchQuiz = await fetch(`http://localhost:4000/quiz/${id}`);
            const quiz = await fetchQuiz.json();
            setCurrentQuiz(quiz)
            setIsLoading(false);
        }
        fetchData()
    }, [id])

    // only render nav bar and loading message until quiz has been found from database
    if(isLoading){
        return (
            <>
                <Nav />
                <p>Quiz Loading...</p>
            </>
        )
    }

    return (
        <>
            <Nav />
            <div>
                <h1>View Quiz</h1>
                <h2>{currentQuiz.title}</h2>
                <div>
                    {currentQuiz.questions.map((question, index) => {
                        return (
                            <div key={index}>
                                <h4>Question</h4>
                                <h3>{question.questionText}</h3>
                                <h4>Answers</h4>
                                <div>
                                    {question.answerOptions.map((answer, ansIndex) => {
                                        return (
                                            <div key={ansIndex}>
                                                <AnswerBall style={{backgroundColor: answer.isCorrect ? "#79CF19" : "#e80000"}}></AnswerBall>
                                                <p>{answer.answerText}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ViewQuiz;


const AnswerBall = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 100%;
`;