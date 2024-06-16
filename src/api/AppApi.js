import axios from 'axios';

const API_URL = "http://172.16.15.209:8000/api";

export const api = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
    }
});