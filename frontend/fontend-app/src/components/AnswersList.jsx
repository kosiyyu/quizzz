import React, {useEffect, useState} from 'react';
import {createAnswer, deleteAnswer, getAnswers} from '../services/AnswerApi';

const AnswersList = () => {
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await getAnswers();
                setAnswers(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAnswers();
    }, []);

    const handleCreateAnswer = async () => {
        const data = {
            text: 'New answer'
        };
        await createAnswer(data);
        const response = await getAnswers();
        setAnswers(response);
    }

    const handleDeleteAnswer = async (id) => {
        await deleteAnswer(id);
        setAnswers(answers.filter(answer => answer.id !== id));
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Text</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {Object.values(answers).map(answer => (
                <tr key={answer.id}>
                    <td>{answer.text}</td>
                    <td>
                        <button onClick={() => handleDeleteAnswer(answer.id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
            <tfoot>
            <tr>
                <td colSpan="2">
                    <button onClick={handleCreateAnswer}>Create Answer</button>
                </td>
            </tr>
            </tfoot>
        </table>
    );
}

export default AnswersList;