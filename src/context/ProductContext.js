import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    addProduct as apiAddProduct,
    updateProduct as apiUpdateProduct,
    deleteProduct as apiDeleteProduct,
    getAllProducts as apiGetAllProducts,
    getProductById as apiGetProductById
} from './api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        setLoading(true);
        try {
            const data = await apiGetAllProducts();
            setProducts(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addProduct = async (productData) => {
        try {
            const newProduct = await apiAddProduct(productData);
            setProducts([...products, newProduct]);
        } catch (error) {
            setError(error.message);
        }
    };

    const updateProduct = async (productId, productData) => {
        try {
            const updatedProduct = await apiUpdateProduct(productId, productData);
            setProducts(products.map(product => product._id === productId ? updatedProduct : product));
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await apiDeleteProduct(productId);
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            setError(error.message);
        }
    };

    const getProductById = async (productId) => {
        try {
            const product = await apiGetProductById(productId);
            return product;
        } catch (error) {
            setError(error.message);
            return null;
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            loading,
            error,
            addProduct,
            updateProduct,
            deleteProduct,
            getProductById,
            fetchAllProducts
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};
