import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {createResult} from '../services/ResultApi';
import {getQuizById} from "../services/QuizApi";
import 'bootstrap/dist/css/bootstrap.min.css';

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

    return quiz === null || quiz === undefined ? <p className="text-white">Loading the quiz...</p> : (
        <div className="container">
            <h1 className="display-4">Solve quiz</h1>
            <form onSubmit={handleSubmit}>
                {quiz.questions.map((question, index) => (<div key={index}>
                    <h6 className="text-dark">{question.text}</h6>
                    {question.answers.map((answer, answerIndex) => (<div key={answerIndex}>
                        <input
                            type="radio"
                            name={`question${index}`}
                            value={answerIndex}
                            checked={selectedAnswers[index] === answerIndex}
                            onChange={() => handleAnswerChange(index, answerIndex)}
                        />
                        <label className="text-dark">{answer.text}</label>
                    </div>))}
                </div>))}
                <button className="btn btn-dark m-2" type="submit">Submit</button>
            </form>
        </div>);

}

export default SolveQuiz;
