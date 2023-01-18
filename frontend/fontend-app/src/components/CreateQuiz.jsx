import React, {useState} from 'react';
import {createQuiz} from '../services/QuizApi'
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateQuiz = () => {
    const [quizName, setQuizName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const handleQuizNameChange = (e) => {
        setQuizName(e.target.value);
    }

    const handleQuestionChange = (index, e) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = e.target.value;
        setQuestions(updatedQuestions);
    }

    const handleAnswerChange = (questionIndex, answerIndex, e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex][answerIndex] = e.target.value;
        setAnswers(updatedAnswers);
    }

    const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
        setCorrectAnswers(prevCorrectAnswers => {
            const updatedCorrectAnswers = [...prevCorrectAnswers];
            updatedCorrectAnswers[questionIndex] = answerIndex;
            return updatedCorrectAnswers;
        });
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, '']);
        setAnswers([...answers, []]);
    }

    const handleAddAnswer = (questionIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = [...answers[questionIndex], ''];
        setAnswers(updatedAnswers);
    }

    const handleRemoveQuestion = (index) => {
        setQuestions(prevQuestions => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions.splice(index, 1);
            return updatedQuestions;
        });
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers.splice(index, 1);
            return updatedAnswers;
        });
    }

    const handleRemoveAnswer = (questionIndex, answerIndex) => {
        //console.log("aaaaaaaaaaaaaaaa");
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter((_, i) => i !== answerIndex);
            return updatedAnswers;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const quiz = {
            name: quizName,
            questions: questions.map((question, index) => ({
                text: question,
                points_per_correct_answer: 1,
                answers: answers[index].map((answer, answerIndex) => ({
                    text: answer,
                    correct: correctAnswers[index] === answerIndex
                }))
            }))
        }

        await createQuiz(quiz);
    }


    return (
        <div className={"container"}>
            <h1 className="display-4">Create quiz</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="quizName">Quiz Name:</label>
                    <input className="form-control"
                        type="text"
                        id="quizName"
                        value={quizName}
                        onChange={handleQuizNameChange}
                    />
                    <br/>
                </div>
                {questions.map((q, i) => (
                    <div className={"question"} key={i}>
                        <label htmlFor={`question${i}`}>Question {i + 1}:</label>
                        <input
                            className="form-control"
                            type="text"
                            id={`question${i}`}
                            value={q}
                            onChange={(e) => handleQuestionChange(i, e)}
                        />
                        <button className="btn btn-dark" type="button" onClick={() => handleRemoveQuestion(i)}>
                            Remove question
                        </button>
                        <br/>
                        {answers[i].map((a, j) => (
                            <div className={"answer"} key={j}>
                                <label htmlFor={`answer${i}-${j}`}>Answer {j + 1}:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id={`answer${i}-${j}`}
                                    value={a}
                                    onChange={(e) => handleAnswerChange(i, j, e)}
                                />
                                <input
                                    type="radio"
                                    name={`correct-answer-${i}`}
                                    id={`correct-answer${i}-${j}`}
                                    checked={correctAnswers[i] === j}
                                    onChange={() => handleCorrectAnswerChange(i, j)}
                                />
                                <button className="btn btn-dark m-2" type="button" onClick={() => handleRemoveAnswer(i, j)}>
                                    Remove answer
                                </button>
                                <br/>
                            </div>
                        ))}
                        <button className="btn btn-dark m-2" type="button" onClick={() => handleAddAnswer(i)}>
                            Add answer
                        </button>
                        <br/>
                    </div>
                ))}
                <button className="btn btn-dark m-2" type="button" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <br/>
                <button className="btn btn-dark m-2 btn-lg p-3" type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuiz;


