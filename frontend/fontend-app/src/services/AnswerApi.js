import axios from 'axios';
import { API_BASE_URL } from './config'

export const getAnswers = () => {
  return axios.get(`${API_BASE_URL}/api/answers`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

export const createAnswer = (data) => {
  return axios.post(`${API_BASE_URL}/api/answers`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

export const deleteAnswer = (id) => {
  return axios.delete(`${API_BASE_URL}/api/answers/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

export const getAnswerById = (id) => {
  return axios.get(`${API_BASE_URL}/api/answers/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}
