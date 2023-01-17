import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {createResult} from '../services/ResultApi';
import {getQuizById} from "../services/QuizApi";

const SolveQuiz = ({id}) => {
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const navigate = useNavigate();

         useEffect(() => {
        getQuizById(id) // call the function here
            .then(data => {
                setQuiz(data);
            });
    }, [])

    const handleAnswerChange = (questionIndex, answerIndex) => {
        setSelectedAnswers(prevSelectedAnswers => {
            const updatedSelectedAnswers = [...prevSelectedAnswers];
            updatedSelectedAnswers[questionIndex] = answerIndex;
            return updatedSelectedAnswers;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let result = {
            quiz_id: quiz.id, answers: selectedAnswers.map((answerIndex, questionIndex) => ({
                question_id: quiz.questions[questionIndex].id,
                answer_id: quiz.questions[questionIndex].answers[answerIndex].id
            }))
        }

        const data = await createResult(result)
        navigate(`/result/${data.id}`);
    }

    return quiz === null || quiz === undefined ? <p>Loading the quiz...</p> : (
        <form onSubmit={handleSubmit}>
            {quiz.questions.map((question, index) => (<div key={index}>
                <label>{question.text}</label>
                {question.answers.map((answer, answerIndex) => (<div key={answerIndex}>
                    <input
                        type="radio"
                        name={`question${index}`}
                        value={answerIndex}
                        checked={selectedAnswers[index] === answerIndex}
                        onChange={() => handleAnswerChange(index, answerIndex)}
                    />
                    <label>{answer.text}</label>
                </div>))}
            </div>))}
            <button type="submit">Submit</button>
        </form>);
}

export default SolveQuiz;
