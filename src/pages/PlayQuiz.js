import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";

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
        setShowAnswer(true);

        // after 1.5s do this
        setTimeout(() => {
            // reset answer button colour and see what next question is
            e.target.style.backgroundColor = "#f5f5f5";
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
                <div>
                    <h1>{currentQuiz.title}</h1>
                    <h2>Score</h2>
                    <p>{score}<span>/{currentQuiz.questions.length}</span></p>
                    <Link to="/">Go Back</Link>
                </div>
            ) : (
                <div>
                    <h1>{currentQuiz.title}</h1>
                    <div>
                        <h2>{currentQuiz.questions[currentQuestion].questionText}</h2>
                        <div>
                            {currentQuiz.questions[currentQuestion].answerOptions.map((answer, index) => {
                                return (
                                    <button key={index} style={{backgroundColor: showAnswer && answer.isCorrect ? "#79CF19" : ""}} onClick={e => handleAnswerClick(answer.isCorrect, e)} disabled={showAnswer}>{answer.answerText}</button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default PlayQuiz;