import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const addReview = async({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/review/addReview";
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

const getAllReviews = async() => {
    try {
        const idToken = await getIdToken();
        const url = "/review/getReviews";
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

const getReviewById = async({id}) => {
    try {
        const idToken = await getIdToken();
        const url = `/review/getReviewById/id=${id}`;
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

const updateReview = async({id, data}) => {
    try {
        const idToken = await getIdToken();
        const url = `/review/updateReview/id=${id}`;
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

const deleteReview = async({id}) => {
    try {
        const idToken = await getIdToken();
        const url = `/review/deleteReview/id=${id}`;
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

export {addReview, getAllReviews, getReviewById, updateReview, deleteReview}
