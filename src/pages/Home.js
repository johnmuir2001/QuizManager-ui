import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Play, View, Edit } from "../components/buttons";
import styled from "styled-components";

const Home = () => {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // gets all quizzes on page load
    useEffect(() => {
        const fetchData = async () => {
            const quizzes = await fetch("http://localhost:4000/quiz/");
            const allQuizzes = await quizzes.json();
            setAllQuizzes(allQuizzes);
        }
        fetchData();
        setIsLoading(false);
    }, [])

    return (
        <>
            <Nav />
            <PageWrap>
                <h1>Quizzes</h1>
                {isLoading
                    ? <p>Quizzes Loading...</p>
                    : allQuizzes.map((quiz, index) => {
                        return(
                            <QuizCard key={index}>
                                <h3>{quiz.title}</h3>
                                <div>
                                    <Play quizId={quiz._id}/>
                                    <View quizId={quiz._id} roles={["Admin", "SuperAdmin"]}/>
                                    <Edit quizId={quiz._id} roles={["SuperAdmin"]}/>
                                </div>
                            </QuizCard>
                        )}
                    )
                }
            </PageWrap>
        </>
    )
}

export default Home;

const PageWrap = styled.div`
    margin: 50px;
`;

const QuizCard = styled.div`
    width: 400px;

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

    div {
        background-color: var(--dark-gray);
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
`;