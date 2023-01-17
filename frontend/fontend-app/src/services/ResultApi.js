import axios from "axios";
import {API_BASE_URL} from "./config";
import {toast} from "react-toastify";

export const createResult = (data) => {
    return axios.post(`${API_BASE_URL}/api/solve`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            toast.success('Quiz send!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
            return response.data;
        })
        .catch(error => {
            toast.error('Error while sending quiz!', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        });
}

export const getResultById = (id) => {
    return axios.get(`${API_BASE_URL}/api/solve/id/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log(error);
        });
}