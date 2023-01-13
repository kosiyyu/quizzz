import React, {useState} from 'react';
import {createAnswer} from '../services/AnswerApi'
import {createQuestion} from '../services/QuestionApi'
import {createQuiz} from '../services/QuizApi'


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
        //console.log("handleRemoveAnswer called");
        setAnswers(prevAnswers => {
            const updatedAnswers = [...prevAnswers];
            updatedAnswers[questionIndex] = updatedAnswers[questionIndex].filter((_, i) => i !== answerIndex);
            //console.log("questionIndex: " + questionIndex + ", answerIndex: " + answerIndex);
            return updatedAnswers;
        });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    // create the quiz object
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

    // send the entire quiz object to the server
    await createQuiz(quiz);
}


    return (
        <div>
            <h1>Create Quiz</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="quizName">Quiz Name:</label>
                <input
                    type="text"
                    id="quizName"
                    value={quizName}
                    onChange={handleQuizNameChange}
                />
                <br/>
                {questions.map((q, i) => (
                    <div key={i}>
                        <label htmlFor={`question${i}`}>Question {i + 1}:</label>
                        <input
                            type="text"
                            id={`question${i}`}
                            value={q}
                            onChange={(e) => handleQuestionChange(i, e)}
                        />
                        <button type="button" onClick={() => handleRemoveQuestion(i)}>
                            rem quest Dummy
                        </button>
                        <br/>
                        {answers[i].map((a, j) => (
                            <div key={j}>
                                <label htmlFor={`answer${i}-${j}`}>Answer {j + 1}:</label>
                                <input
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
                                <button type="button" onClick={() => handleRemoveAnswer(i, j)}>
                                    rem ans Dummy
                                </button>
                                <br/>
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddAnswer(i)}>
                            Add Answer
                        </button>
                        <br/>
                    </div>
                ))}
                <button type="button" onClick={handleAddQuestion}>
                    Add Question
                </button>
                <br/>
                <button type="submit">Create Quiz</button>
            </form>
        </div>
    );
};

export default CreateQuiz;


