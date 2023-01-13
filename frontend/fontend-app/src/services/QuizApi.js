import axios from 'axios';
import {API_BASE_URL} from './config';
import { toast } from 'react-toastify';



export const getQuizzes = () => {
    return axios.get(`${API_BASE_URL}/api/quizzes`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
}

export const createQuiz = (data) => {
    return axios.post(`${API_BASE_URL}/api/quizzes`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
        .catch(error => {

            toast.error('Error while creating quiz!', {
            position: toast.POSITION.BOTTOM_RIGHT
            });
        });
}

export const deleteQuiz = (id) => {
    return axios.delete(`${API_BASE_URL}/api/quizzes/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
}

export const getQuizById = (id) => {
    return axios.get(`${API_BASE_URL}/api/quizzes/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
}