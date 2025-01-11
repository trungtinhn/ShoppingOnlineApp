import axios from 'axios';

const API_URL = "http://10.0.198.107:8000/api";

export const api = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
    }
});
export {API_URL}