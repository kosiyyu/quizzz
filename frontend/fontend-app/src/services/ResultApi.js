import axios from "axios";
import {API_BASE_URL} from "./config";

export const createResult = (data) => {
  return axios.post(`${API_BASE_URL}/api/solve`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}