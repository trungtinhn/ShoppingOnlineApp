import { getIdToken } from "../middleware/getToken";
import { api } from "./AppApi";

const getParameter = async() => {
    try {
        const idToken = await getIdToken();
        const url = "/parameter/get";
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

const updateParameter = async({data}) => {
    try {
        const idToken = await getIdToken();
        const url = "/parameter/update";
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

export { getParameter, updateParameter }