import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const createOrder = async({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/order/addOrder";
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

const getAllOrders = async() => {
    try {
        const idToken = await getIdToken();
        const url = "/order/getAllOrder";
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

const getOrderById = async({id}) => {
    try {
        const idToken = await getIdToken();
        const url = `/order/getOrders/${id}`;
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

const getOrdersByUserId = async({userId}) => {
    try {
        const idToken = await getIdToken();
        const url = `/order/user/${userId}`;
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

const getOrdersByUserIdAndStatus = async({userId, status}) => {
    try {
        const idToken = await getIdToken();
        const url = `/order/user/${userId}/status/${status}`;
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

const updateOrderById = async({id, data}) => {
    try {
        const idToken = await getIdToken();
        const url = `/order/updateOrders/${id}`;
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

const updateOrderStatus = async({id, status}) => {
    try {
        const idToken = await getIdToken();
        const url = `/order/${id}/status`;
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`
            },
            data: {status},
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

const deleteOrderById = async({id}) => {
    try {
        const idToken = await getIdToken();
        const url = `/order/deleteOrders/${id}`;
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
const getOrderByStatus = async({status}) => {
    try {
        const idToken = await getIdToken();
        const url = `/order/getOrderByStatus/status/${status}`;
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

export {createOrder , getOrderByStatus,
    getAllOrders, getOrderById, getOrdersByUserId, 
    getOrdersByUserIdAndStatus, updateOrderById, 
    updateOrderStatus, deleteOrderById}