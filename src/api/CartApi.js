import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";
const addProductToCart = async({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/cart/getCart";
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            data: data,
        };
        const res = await api(url, config);
        return res;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
};

const updateProductInCart = async({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/cart/updateCart";
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            data: data,
        };
        const res = await api(url, config);
        return res;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
};

const removeProductFromCart = async({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/cart/deleteCart";
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            data: data,
        };
        const res = await api(url, config);
        return res;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
};

const clearCart = async() => {
    try {
        const idToken = await getIdToken();
        const url = "/cart/clearCart";
        const config = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
        };
        const res = await api(url, config);
        return res;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
};

const getCart = async({userId}) => {
    try {
        const idToken = await getIdToken();
        const url = `/cart/userId=${userId}`;
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
        };
        const res = await api(url, config);
        return res;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else {
            throw error;
        }
    }
};

export { addProductToCart, updateProductInCart, removeProductFromCart, clearCart, getCart }