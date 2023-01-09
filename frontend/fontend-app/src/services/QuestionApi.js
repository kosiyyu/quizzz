import axios from 'axios';
import { API_BASE_URL } from './config'

export const getQuestions = () => {
  return axios.get(`${API_BASE_URL}/api/questions`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

export const createQuestion = (data) => {
  return axios.post(`${API_BASE_URL}/api/questions`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.data)
    .catch(error => {
        console.log(data);
      console.log(error);
    });
}

export const deleteQuestion = (id) => {
  return axios.delete(`${API_BASE_URL}/api/questions/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

export const getQuestionById = (id) => {
  return axios.get(`${API_BASE_URL}/api/questions/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
