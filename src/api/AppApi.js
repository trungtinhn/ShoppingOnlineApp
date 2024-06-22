import axios from 'axios';

const API_URL = "https://shoppingserver-yhbt.onrender.com/api";

export const api = axios.create({
    baseURL: API_URL,
    responseType: 'json',
    headers: {
        "Content-Type": "application/json",
    }
});
export {API_URL}