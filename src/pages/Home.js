import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Play, View, Edit, Delete, AddQuizButton } from "../components/buttons";
import styled from "styled-components";

const Home = () => {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        const quizzes = await fetch("http://localhost:4000/quiz/");
        const allQuizzes = await quizzes.json();
        setAllQuizzes(allQuizzes);
    }

    // gets all quizzes on page load
    useEffect(() => {
        fetchData();
        setIsLoading(false);
    }, [])

    return (
        <>
            <Nav />
            <PageWrap>
                <h1>Quizzes</h1>
                <QuizWrap>
                    {isLoading
                        ? <p>Quizzes Loading...</p>
                        : allQuizzes.map((quiz, index) => {
                            return(
                                <QuizCard key={index}>
                                    <h3>{quiz.title}</h3>
                                    <StatWrap>
                                        <p>{quiz.stats.plays} plays</p>
                                        <p>{quiz.stats.totalQuestions} questions</p>
                                    </StatWrap>
                                    
                                    <ButtonWrap>
                                        <Play quizId={quiz._id}/>
                                        <View quizId={quiz._id} roles={["View", "Edit"]}/>
                                        <Edit quizId={quiz._id} roles={["Edit"]}/>
                                        <Delete fetchData={fetchData} quizId={quiz._id} roles={["Edit"]}/>
                                    </ButtonWrap>
                                </QuizCard>
                            )}
                        )
                    }
                    <AddQuizButton fetchData={fetchData} roles={["Edit"]} />
                </QuizWrap>
            </PageWrap>
        </>
    )
}

export default Home;

const PageWrap = styled.div`
    margin: 50px;
`;

const QuizWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const QuizCard = styled.div`
    width: 400px;
    margin: 10px;

    h3 {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: var(--med-gray);
        height: 130px;
        box-sizing: border-box;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: 0;
        color: white;
    }
`;

const StatWrap = styled.div`
    display: flex;
    justify-content: center;
    background-color: var(--text-gray);

    p {
        margin: 3px 10px;
        color: white;
        font-size: 13px;
    }
`;

const ButtonWrap = styled.div`
    background-color: var(--dark-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;