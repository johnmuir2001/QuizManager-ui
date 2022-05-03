import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import styled from "styled-components";

const EditQuiz = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [quizTitle, setQuizTitle] = useState("");
    const [quizStats, setQuizStats] = useState({})
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [questionStats, setQuestionStats] = useState([]);

    const navigate = useNavigate();

    // quiz id from the url
    const { id } = useParams();

    // gets quiz by id on page load
    useEffect(() => {
        const fetchData = async () => {
            const fetchQuiz = await fetch(`http://localhost:4000/quiz/${id}`);
            const quiz = await fetchQuiz.json();

            // populate state with quiz data from fetch request
            setQuizTitle(quiz.title);
            setQuizStats(quiz.stats);
            for(let i = 0; i < quiz.questions.length; i++){
                setQuizQuestions(oldArr => [...oldArr, quiz.questions[i].questionText]);
                setQuizAnswers(oldArr => [...oldArr, quiz.questions[i].answerOptions]);
                setQuestionStats(oldArr => [...oldArr, quiz.questions[i].stats]);
            }
            setIsLoading(false);
        }
        fetchData()
    }, [id])

    // update question to input value
    const handleQuestionChange = (index, e) => {
        let updatedQuestions = [...quizQuestions];
        updatedQuestions[index] = e.target.value;
        setQuizQuestions(updatedQuestions);
    }

    // update answer to input value
    const handleAnswerOptionChange = (index, ansIndex, e) => {
        let updatedAnswerOptions = [...quizAnswers];
        updatedAnswerOptions[index][ansIndex].answerText = e.target.value;
        setQuizAnswers(updatedAnswerOptions);
    }

    // update all answers isCorrect to false and then change the newly selected radio to isCorrect true
    const handleCorrectAnswerChange = (index, ansIndex, e) => {
        let updatedAnswerOptions = [...quizAnswers];
        for (let i = 0; i < updatedAnswerOptions[index].length; i++) {
            updatedAnswerOptions[index][i].isCorrect = false;
        }
        updatedAnswerOptions[index][ansIndex].isCorrect = true;
        setQuizAnswers(updatedAnswerOptions)
    }

    // delete question and answer from state values using index of clicked button
    const handleDeletQuestion = (index) => {
        let updatedStats = [...questionStats];
        updatedStats.splice(index, 1);
        setQuestionStats(updatedStats);

        let updatedQuestions = [...quizQuestions];
        updatedQuestions.splice(index, 1);
        setQuizQuestions(updatedQuestions);

        let updatedAnswers = [...quizAnswers];
        updatedAnswers.splice(index, 1);
        setQuizAnswers(updatedAnswers);
    }

    // add question and answers to corresponding state values
    const handleAddQuestion = () => {
        let updatedStats = [...questionStats];
        updatedStats.push({
            totalRight: 0,
            totalWrong: 0
        });
        setQuestionStats(updatedStats);

        let updatedQuestions = [...quizQuestions];
        updatedQuestions.push("QUESTION");
        setQuizQuestions(updatedQuestions)

        let updatedAnswers = [...quizAnswers];
        updatedAnswers.push([
            {answerText: "ANSWER", isCorrect: true},
            {answerText: "ANSWER", isCorrect: false},
            {answerText: "ANSWER", isCorrect: false},
            {answerText: "ANSWER", isCorrect: false},
        ]);
        setQuizAnswers(updatedAnswers);
    }

    // update quiz
    const handleSubmit = async (e) => {
        e.preventDefault();
        // format state values into one object that is the same format as the quiz schema
        let updatedQuiz = {title: quizTitle, questions: [], stats: quizStats};
        for (let i = 0; i < quizQuestions.length; i++) {
            updatedQuiz.questions.push({
                questionText: quizQuestions[i],
                answerOptions: quizAnswers[i],
                stats: questionStats[i]
            });
        }
        updatedQuiz.stats.totalQuestions = updatedQuiz.questions.length;

        try {
            const editQuiz = await fetch(
                `http://localhost:4000/quiz/update/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`
                    },
                    body: JSON.stringify(updatedQuiz)
                }
            )
            const response = await editQuiz.json();
            // if error message from server, display the message or go back to home page if successful
            if(response.message){
                alert(response.message);
                return;
            }
            navigate("/");
        } catch (error) {
            alert(error)
        }
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
            <PageWrap>
                <h1>Edit Quiz</h1>
                <p>Make any changes you want, add more questions, remove some, or change the quiz entirely. Make sure the correct answer is selected. Once you are done click the save changes button.</p>
                <form onSubmit={handleSubmit}>
                    <h4>Quiz Title</h4>
                    <QuizTitle value={quizTitle} onChange={e => setQuizTitle(e.target.value)}/>
                    {quizQuestions.map((question, index) => {
                        return (
                            <QuestionCard key={index}>
                                <QuestionInfo>
                                    <h4>Question {index + 1}</h4>
                                    {(questionStats[index].totalRight === 0 && questionStats[index].totalWrong === 0) ? (
                                        <h4>No has answered this question yet</h4>
                                    ) : (
                                        <h4>{(questionStats[index].totalRight/(questionStats[index].totalRight + questionStats[index].totalWrong)) * 100}% answered correctly</h4>
                                    )}
                                </QuestionInfo>
                                <QuestionTitle value={question} onChange={e => handleQuestionChange(index, e)}/>
                                <h4>Answers</h4>
                                <AnswerWrap>
                                    {quizAnswers[index].map((answer, ansIndex) => {
                                        return (
                                            <AnswerOptionWrap key={ansIndex}>
                                                <input type="radio" name={index} defaultChecked={answer.isCorrect} onChange={e => handleCorrectAnswerChange(index, ansIndex, e)}/>
                                                <AnswerText value={answer.answerText} onChange={e => handleAnswerOptionChange(index, ansIndex, e)}/>
                                            </AnswerOptionWrap>
                                        )
                                    })}
                                </AnswerWrap>
                                <button type="button" onClick={() => handleDeletQuestion(index)}>Delete Question</button>
                            </QuestionCard>
                        )
                    })}
                    <AddButton type="button" onClick={handleAddQuestion}>Add Question</AddButton>
                    <SaveButton type="submit">Save Changes</SaveButton>
                </form>
            </PageWrap>
        </>
    )
}

export default EditQuiz;

const PageWrap = styled.div`
    margin: 50px;

    h4 {
        margin: 0;
        color: black;
        font-size: 16px;
    }
`;

const QuizTitle = styled.input`
    width: 740px;
    font-size: 25px;
`;

const QuestionCard = styled.div`
    background-color: var(--very-light-gray);
    width: 700px;
    padding: 20px;
    margin: 10px 0;
    border-radius: 10px;

    h4 {
        margin: 0;
        font-weight: 400;
        color: var(--text-gray);
        font-size: 13px;
    }
 
    & > h4 {
        border-bottom: 1px solid var(--text-gray);
    }

    button {
        background-color: var(--red);

        &:hover {
            background-color: var(--red-hover);
        }
    }
`;

const QuestionInfo = styled.div`
    border-bottom: 1px solid var(--text-gray);
    display: flex;
    justify-content: space-between;
`;

const QuestionTitle = styled.input`
    width: 100%;
`;

const AnswerWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const AnswerOptionWrap = styled.div`
    display: flex;
    align-items: center;
    width: 50%;

    input {
        margin: 5px;
    }
`;

const AnswerText = styled.input`
    width: 100%;
`;

const AddButton = styled.button`
    background-color: var(--blue);
    margin: 0 20px 0 0;

    &:hover {
        background-color: var(--blue-hover);
    }
`;

const SaveButton = styled.button`
    background-color: var(--green);

    &:hover {
        background-color: var(--green-hover);
    }
`;