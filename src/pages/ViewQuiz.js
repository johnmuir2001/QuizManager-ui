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
            <PageWrap>
                <h1>View Quiz</h1>
                <h2>{currentQuiz.title} - {currentQuiz.questions.length} questions</h2>
                <div>
                    {currentQuiz.questions.map((question, index) => {
                        return (
                            <QuestionCard key={index}>
                                <QuestionInfo>
                                    <h4>Question {index + 1}</h4>
                                    {(question.stats.totalRight === 0 && question.stats.totalWrong === 0) ? (
                                        <h4>No has answered this question yet</h4>
                                    ) : (
                                        <h4>{Math.round((question.stats.totalRight/(question.stats.totalRight + question.stats.totalWrong)) * 100)}% answered correctly</h4>
                                    )}
                                </QuestionInfo>
                                <h3>{question.questionText}</h3>
                                <h4>Answers</h4>
                                <AnswerWrap>
                                    {question.answerOptions.map((answer, ansIndex) => {
                                        return (
                                            <AnswerOptionWrap key={ansIndex}>
                                                <AnswerBall style={{backgroundColor: answer.isCorrect ? "var(--green)" : "var(--red)"}}></AnswerBall>
                                                <p>{answer.answerText}</p>
                                            </AnswerOptionWrap>
                                        )
                                    })}
                                </AnswerWrap>
                            </QuestionCard>
                        )
                    })}
                </div>
            </PageWrap>
        </>
    )
}

export default ViewQuiz;

const PageWrap = styled.div`
    margin: 50px;
`;

const QuestionCard = styled.div`
    background-color: var(--very-light-gray);
    width: 700px;
    padding: 20px;
    margin: 10px 0;
    border-radius: 10px;

    h3 {
        margin: 10px 0;
    }

    h4 {
        margin: 0;
        font-weight: 400;
        color: var(--text-gray);
        font-size: 13px;
    }
 
    & > h4 {
        border-bottom: 1px solid var(--text-gray);
    }
`;

const QuestionInfo = styled.div`
    color: var(--text-gray);
    font-size: 13px;
    border-bottom: 1px solid var(--text-gray);
    display: flex;
    justify-content: space-between;

    h4 {
        margin: 0;
        font-weight: 400;
    }
`;

const AnswerWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const AnswerOptionWrap = styled.div`
    display: flex;
    align-items: center;
    width: 50%;

    p {
        margin: 5px 10px;
    }
`;

const AnswerBall = styled.div`
    height: 10px;
    width: 10px;
    border-radius: 100%;
`;