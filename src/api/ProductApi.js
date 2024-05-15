import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const addProduct = async (productData) => {
    try {
        const response = await api.post('/products', productData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const response = await api.put(`/products/${productId}`, productData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAllProducts = async () => {
    try {
        const response = await api.get('/products');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
