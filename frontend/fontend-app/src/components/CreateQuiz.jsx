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

        // create the quiz
        const quiz = await createQuiz({name: quizName});

        // create the questions and answers
        const createdQuestions = [];
        for (let i = 0; i < questions.length; i++) {
            // create the question
            const json = JSON.stringify({text: questions[i], points_per_correct_answer: 1, quiz_id: quiz.id});
            const question = await createQuestion(json);
            createdQuestions.push(question);

            // create the answers for this question
            for (let j = 0; j < answers[i].length; j++) {
                const isCorrect = j === correctAnswers[i];
                console.log(isCorrect)
                await createAnswer({text: answers[i][j], correct: isCorrect, question_id: question.id});
            }
        }

        console.log('Quiz created successfully!')
        //alert('Quiz created successfully!');
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


