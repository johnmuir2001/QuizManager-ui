import { useState, useEffect } from "react";
import Nav from "../components/Nav";
import { Play } from "../components/buttons";

const Home = () => {
    const [allQuizzes, setAllQuizzes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            <h1>Home</h1>
            {isLoading
                ? <p>Quizzes Loading...</p>
                : allQuizzes.map((quiz, index) => {
                    return(
                        <div key={index}>
                            <h3>{quiz.title}</h3>
                            <div>
                                <Play quizId={quiz._id}/>
                            </div>
                        </div>
                    )}
                )
            }
        </>
    )
}

export default Home;