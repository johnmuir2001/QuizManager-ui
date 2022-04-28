import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";

const PlayQuiz = () => {
    const [currentQuiz, setCurrentQuiz] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const fetchQuiz = await fetch(`http://localhost:4000/quiz/${id}`);
            const quiz = await fetchQuiz.json();
            setCurrentQuiz(quiz);
            setIsLoading(false);
        }
        fetchData()
    }, [])
    return (
        <>
            <Nav />
            <h1>Play Quiz</h1>
        </>
    )
}

export default PlayQuiz;