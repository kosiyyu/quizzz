import React, {useEffect, useState} from 'react';
import {createResult} from '../services/ResultApi';
import axios from 'axios';

const SolveQuiz = ({id}) => {
    const [quiz, setQuiz] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/quizzes/${id}`)
            .then(response => {
                console.log(response)
                setQuiz(response.data)
            })
            .catch(error => {
                console.log(error)
            })
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

        // create the result object
        const result = {
            quiz_id: quiz.id, answers: selectedAnswers.map((answerIndex, questionIndex) => ({
                question_id: quiz.questions[questionIndex].id,
                answer_id: quiz.questions[questionIndex].answers[answerIndex].id
            }))
        }

        // send the entire result object to the server
        await createResult(result);
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
