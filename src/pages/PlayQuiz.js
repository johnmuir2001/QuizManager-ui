import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import styled from "styled-components";

const PlayQuiz = () => {
    const [currentQuiz, setCurrentQuiz] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [endQuiz, setEndQuiz] = useState(false);

    // quiz id from the url
    const { id } = useParams();

    // gets quiz by id on page load
    useEffect(() => {
        const fetchData = async () => {
            const fetchQuiz = await fetch(`http://localhost:4000/quiz/${id}`);
            const quiz = await fetchQuiz.json();
            setCurrentQuiz(quiz);
            setIsLoading(false);
        }
        fetchData();
    }, [id])

    // when user answers the question
    const handleAnswerClick = (isCorrect, e) => {
        // add 1 to score if they are correct
        if(isCorrect){
            setScore(score + 1);
        }
        // show answer and set selected answer to red, correct answer changes to green due to inline button style which will override the red style changed here
        e.target.style.backgroundColor = "#e80000";
        e.target.style.color = "white";
        setShowAnswer(true);

        // after 1.5s do this
        setTimeout(() => {
            // reset answer button colour and see what next question is
            e.target.style.backgroundColor = "";
            e.target.style.color = "";
            const nextQuestion = currentQuestion + 1;
            setShowAnswer(false)

            // if there is a next question move on to it or finish the quiz
            if(nextQuestion < currentQuiz.questions.length){
                setCurrentQuestion(nextQuestion);
            } else {
                setEndQuiz(true);
            }
        }, 1500);
    }

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
            { endQuiz ? (
                <ScoreWrap>
                    <h1>{currentQuiz.title}</h1>
                    <h2>Score:</h2>
                    <p>{score}<span>/{currentQuiz.questions.length}</span></p>
                    <StyledLink to="/">Go Back</StyledLink>
                </ScoreWrap>
            ) : (
                <QuizWrap>
                    <h1>{currentQuiz.title}</h1>
                    <QuestionWrap>
                        <h2>{currentQuiz.questions[currentQuestion].questionText}</h2>
                        <AnswerWrap>
                            {currentQuiz.questions[currentQuestion].answerOptions.map((answer, index) => {
                                return (
                                    <AnswerButton key={index} style={{backgroundColor: showAnswer && answer.isCorrect ? "#79CF19" : ""}} onClick={e => handleAnswerClick(answer.isCorrect, e)} disabled={showAnswer}>{answer.answerText}</AnswerButton>
                                )
                            })}
                        </AnswerWrap>
                    </QuestionWrap>
                </QuizWrap>
            )}
        </>
    )
}

export default PlayQuiz;

const QuizWrap = styled.div`
    margin: 50px;
`;

const QuestionWrap = styled.div`
    background-color: var(--dark-gray);
    border-radius: 10px;
    padding: 10px;

    h2 {
        background-color: var(--med-gray);
        height: 320px;
        color: white;
        font-size: 30px;
        border-radius: 10px;
        box-sizing: border-box;
        padding: 50px;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

const AnswerWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 10px 0 0 0;

`;

const AnswerButton = styled.button`
    width: calc(50% - 3px);
    padding: 50px 20px;
    background-color: var(--very-light-gray);
    font-size: 18px;
    color: black;

    &:hover:enabled {
        background-color: var(--light-gray);
    }
`;

const ScoreWrap = styled.div`
    margin: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2, p {
        margin: 0;
    }

    p {
        font-size: 100px;
    }
    
    span {
        font-size: 50px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    padding: 10px 25px;
    background-color: var(--blue);
    color: white;
    font-weight: 700;
    border-radius: 5px;

&:hover {
    background-color: var(--blue-hover)
}
`;